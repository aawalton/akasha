import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import { tempSymbolId } from "../context-temp-symbol-id/context-temp-symbol-id.module.code.ts"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  createOptionalContinuationIdentifier,
  getOptionalContinuationData,
} from "../tstl-optional-chain-data/tstl-optional-chain-data.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import {
  canBeFalsyWhenNotNull,
  expressionResultIsUsed,
} from "../tstl-typescript/tstl-typescript.module.code.ts"
import { assert, cast } from "../tstl-utils/tstl-utils.module.code.ts"
import {
  transformElementAccessExpressionWithCapture,
  transformPropertyAccessExpressionWithCapture,
} from "../visit-access/visit-access.module.code.ts"
import { wrapInStatement } from "../visit-expression-statement/visit-expression-statement.module.code.ts"
import { transformOptionalChainWithCaptureHolder } from "../visit-optional-chain-deps/visit-optional-chain-deps.module.code.ts"
import type { ExpressionWithThisValue } from "../visit-this-value-capture/visit-this-value-capture.module.code.ts"

type NormalOptionalChain = ts.PropertyAccessChain | ts.ElementAccessChain | ts.CallChain

function skipNonNullChains(chain: ts.OptionalChain): NormalOptionalChain {
  while (ts.isNonNullChain(chain)) {
    chain = cast(chain.expression, ts.isOptionalChain)
  }
  return chain
}

function flattenChain(chain: ts.OptionalChain) {
  chain = skipNonNullChains(chain)
  const links: NormalOptionalChain[] = [chain]
  while (!chain.questionDotToken && !ts.isTaggedTemplateExpression(chain)) {
    const nextLink: ts.Expression = chain.expression
    assert(ts.isOptionalChain(nextLink))
    chain = skipNonNullChains(nextLink)
    links.unshift(chain)
  }
  return { expression: chain.expression, chain: links }
}

function transformExpressionWithThisValueCapture(
  context: TransformationContext,
  node: ts.Expression,
  thisValueCapture: luaExpressions.Identifier
): ExpressionWithThisValue {
  if (ts.isParenthesizedExpression(node)) {
    return transformExpressionWithThisValueCapture(context, node.expression, thisValueCapture)
  }
  if (ts.isPropertyAccessExpression(node)) {
    return transformPropertyAccessExpressionWithCapture(context, node, thisValueCapture)
  }
  if (ts.isElementAccessExpression(node)) {
    return transformElementAccessExpressionWithCapture(context, node, thisValueCapture)
  }
  return { expression: context.transformExpression(node) }
}

export function transformOptionalChain(
  context: TransformationContext,
  node: ts.OptionalChain
): luaExpressions.Expression {
  return transformOptionalChainWithCapture(context, node, undefined).expression
}

export function transformOptionalChainWithCapture(
  context: TransformationContext,
  tsNode: ts.OptionalChain,
  thisValueCapture: luaExpressions.Identifier | undefined,
  isDelete?: ts.DeleteExpression
): ExpressionWithThisValue {
  const luaTempName = context.createTempName("opt")

  const { expression: tsLeftExpression, chain } = flattenChain(tsNode)

  const tsTemp = createOptionalContinuationIdentifier(luaTempName, tsLeftExpression)
  let tsRightExpression: ts.Expression = tsTemp
  for (const link of chain) {
    if (ts.isPropertyAccessExpression(link)) {
      tsRightExpression = ts.factory.createPropertyAccessExpression(tsRightExpression, link.name)
    } else if (ts.isElementAccessExpression(link)) {
      tsRightExpression = ts.factory.createElementAccessExpression(
        tsRightExpression,
        link.argumentExpression
      )
    } else if (ts.isCallExpression(link)) {
      tsRightExpression = ts.factory.createCallExpression(
        tsRightExpression,
        undefined,
        link.arguments
      )
    } else {
      assertNever(link)
    }
    ts.setOriginalNode(tsRightExpression, link)
  }
  if (isDelete) {
    tsRightExpression = ts.factory.createDeleteExpression(tsRightExpression)
    ts.setOriginalNode(tsRightExpression, isDelete)
  }

  let returnThisValue: luaExpressions.Expression | undefined
  let { precedingStatements: rightPrecedingStatements, result: rightExpression } =
    transformInPrecedingStatementScope(context, () => {
      if (!thisValueCapture) {
        return context.transformExpression(tsRightExpression)
      }

      const { expression: result, thisValue } = transformExpressionWithThisValueCapture(
        context,
        tsRightExpression,
        thisValueCapture
      )
      returnThisValue = thisValue
      return result
    })

  const thisValueCaptureName = context.createTempName("this")
  const leftThisValueTemp = luaExpressions.createIdentifier(
    thisValueCaptureName,
    undefined,
    tempSymbolId
  )
  let capturedThisValue: luaExpressions.Expression | undefined

  const optionalContinuationData = getOptionalContinuationData(tsTemp)
  const rightContextualCall = optionalContinuationData?.contextualCall
  const { precedingStatements: leftPrecedingStatements, result: leftExpression } =
    transformInPrecedingStatementScope(context, () => {
      let result: luaExpressions.Expression
      if (rightContextualCall) {
        ;({ expression: result, thisValue: capturedThisValue } =
          transformExpressionWithThisValueCapture(context, tsLeftExpression, leftThisValueTemp))
      } else {
        result = context.transformExpression(tsLeftExpression)
      }
      return result
    })

  function getLeftMostChainItem(node: ts.Node): ts.Node {
    if (ts.isPropertyAccessExpression(node)) {
      return getLeftMostChainItem(node.expression)
    } else {
      return node
    }
  }
  if (getLeftMostChainItem(tsLeftExpression).kind === ts.SyntaxKind.SuperKeyword) {
    capturedThisValue = luaExpressions.createIdentifier("self")
  }

  function withFirstParam(
    call: luaExpressions.CallExpression,
    replacement: luaExpressions.Expression
  ): undefined {
    call.params = [replacement, ...call.params.slice(1)]
  }
  if (rightContextualCall) {
    if (capturedThisValue) {
      withFirstParam(rightContextualCall, capturedThisValue)
      if (capturedThisValue === leftThisValueTemp) {
        context.addPrecedingStatements(
          luaStatements.createVariableDeclarationStatement(leftThisValueTemp)
        )
      }
    } else {
      if (context.isStrict) {
        withFirstParam(rightContextualCall, luaExpressions.createNilLiteral())
      } else {
        const identifier = luaExpressions.createIdentifier("_G")
        if (rightPrecedingStatements.length === 0) {
          withFirstParam(rightContextualCall, identifier)
        } else {
          const tempContext = context.createTempNameForLuaExpression(identifier)
          rightPrecedingStatements = [
            luaStatements.createVariableDeclarationStatement(tempContext, identifier),
            ...rightPrecedingStatements,
          ]
          withFirstParam(rightContextualCall, tempContext)
        }
      }
    }
  }

  context.addPrecedingStatements(leftPrecedingStatements)

  let leftIdentifier: luaExpressions.Identifier | undefined
  const usedLuaIdentifiers = optionalContinuationData?.usedIdentifiers
  const reuseLeftIdentifier =
    usedLuaIdentifiers &&
    usedLuaIdentifiers.length > 0 &&
    luaExpressions.isIdentifier(leftExpression) &&
    (rightPrecedingStatements.length === 0 ||
      !context.shouldMoveToTemp(leftExpression, tsLeftExpression))
  if (reuseLeftIdentifier) {
    leftIdentifier = leftExpression
    for (const usedIdentifier of usedLuaIdentifiers) {
      usedIdentifier.text = leftIdentifier.text
    }
  } else {
    leftIdentifier = luaExpressions.createIdentifier(luaTempName, undefined, tempSymbolId)
    context.addPrecedingStatements(
      luaStatements.createVariableDeclarationStatement(leftIdentifier, leftExpression)
    )
  }

  if (!expressionResultIsUsed(tsNode) || isDelete) {
    const innerExpression = wrapInStatement(rightExpression)
    const innerStatements: readonly luaStatements.Statement[] = innerExpression
      ? [...rightPrecedingStatements, innerExpression]
      : rightPrecedingStatements

    context.addPrecedingStatements(
      luaStatements.createIfStatement(
        luaExpressions.createBinaryExpression(
          leftIdentifier,
          luaExpressions.createNilLiteral(),
          luaCore.SyntaxKind.InequalityOperator
        ),
        luaStatements.createBlock(innerStatements)
      )
    )
    return { expression: luaExpressions.createNilLiteral(), thisValue: returnThisValue }
  } else if (
    rightPrecedingStatements.length === 0 &&
    !canBeFalsyWhenNotNull(context, context.checker.getTypeAtLocation(tsLeftExpression))
  ) {
    return {
      expression: luaExpressions.createBinaryExpression(
        leftIdentifier,
        rightExpression,
        luaCore.SyntaxKind.AndOperator,
        tsNode
      ),
      thisValue: returnThisValue,
    }
  } else {
    let resultIdentifier: luaExpressions.Identifier
    if (!reuseLeftIdentifier) {
      resultIdentifier = leftIdentifier
    } else {
      resultIdentifier = luaExpressions.createIdentifier(
        context.createTempName("opt_result"),
        undefined,
        tempSymbolId
      )
      context.addPrecedingStatements(
        luaStatements.createVariableDeclarationStatement(resultIdentifier)
      )
    }
    context.addPrecedingStatements(
      luaStatements.createIfStatement(
        luaExpressions.createBinaryExpression(
          leftIdentifier,
          luaExpressions.createNilLiteral(),
          luaCore.SyntaxKind.InequalityOperator
        ),
        luaStatements.createBlock([
          ...rightPrecedingStatements,
          luaStatements.createAssignmentStatement(resultIdentifier, rightExpression),
        ])
      )
    )
    return { expression: resultIdentifier, thisValue: returnThisValue }
  }
}

export function transformOptionalDeleteExpression(
  context: TransformationContext,
  node: ts.DeleteExpression,
  innerExpression: ts.OptionalChain
) {
  transformOptionalChainWithCapture(context, innerExpression, undefined, node)
  return luaExpressions.createBooleanLiteral(true, node)
}

transformOptionalChainWithCaptureHolder.fn = transformOptionalChainWithCapture
