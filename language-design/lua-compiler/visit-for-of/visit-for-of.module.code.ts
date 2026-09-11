import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "akasha/language-design/lua-compiler/context-visitors/context-visitors.module.code.ts"
import {
  getIterableExtensionKindForNode,
  IterableExtensionKind,
} from "akasha/language-design/lua-compiler/language-extension-kinds/language-extension-kinds.module.code.ts"
import * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/language-design/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformLuaLibFunction } from "akasha/language-design/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/language-design/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { isArrayType } from "akasha/language-design/lua-compiler/typescript/typescript.module.code.ts"
import {
  transformForOfIterableStatement,
  transformForOfPairsIterableStatement,
  transformForOfPairsKeyIterableStatement,
} from "akasha/language-design/lua-compiler/visit-extension-iterable/visit-extension-iterable.module.code.ts"
import {
  isRangeFunction,
  transformRangeStatement,
} from "akasha/language-design/lua-compiler/visit-extension-range/visit-extension-range.module.code.ts"
import {
  transformForInitializer,
  transformLoopBody,
} from "akasha/language-design/lua-compiler/visit-utils/visit-utils.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"
import * as ts from "typescript"

function transformForOfArrayStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const valueVariable = transformForInitializer(context, statement.initializer, block)
  const ipairsCall = luaExpressions.createCallExpression(
    luaExpressions.createIdentifier("ipairs"),
    [context.transformExpression(statement.expression)]
  )

  return luaStatements.createForInStatement(
    block,
    [luaExpressions.createAnonymousIdentifier(), valueVariable],
    [ipairsCall],
    statement
  )
}

function transformForOfIteratorStatement(
  context: TransformationContext,
  statement: ts.ForOfStatement,
  block: luaStatements.Block
): luaStatements.Statement {
  const valueVariable = transformForInitializer(context, statement.initializer, block)
  const iterable = transformLuaLibFunction(
    context,
    LuaLibFeature.Iterator,
    statement.expression,
    context.transformExpression(statement.expression)
  )

  return luaStatements.createForInStatement(
    block,
    [luaExpressions.createAnonymousIdentifier(), valueVariable],
    [iterable],
    statement
  )
}

export const transformForOfStatement: FunctionVisitor<ts.ForOfStatement> = (node, context) => {
  const body = luaStatements.createBlock(transformLoopBody(context, node))

  if (ts.isCallExpression(node.expression) && isRangeFunction(context, node.expression)) {
    return transformRangeStatement(context, node, body)
  }
  const iterableExtensionType = getIterableExtensionKindForNode(context, node.expression)
  if (iterableExtensionType != null) {
    if (iterableExtensionType === IterableExtensionKind.Iterable) {
      return transformForOfIterableStatement(context, node, body)
    } else if (iterableExtensionType === IterableExtensionKind.Pairs) {
      return transformForOfPairsIterableStatement(context, node, body)
    } else if (iterableExtensionType === IterableExtensionKind.PairsKey) {
      return transformForOfPairsKeyIterableStatement(context, node, body)
    } else {
      assertNever(iterableExtensionType)
    }
  }
  if (isArrayType(context, context.checker.getTypeAtLocation(node.expression))) {
    return transformForOfArrayStatement(context, node, body)
  }

  return transformForOfIteratorStatement(context, node, body)
}
