import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  createExportedIdentifier,
  getIdentifierExportScope,
} from "../tstl-export/tstl-export.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import {
  addScopeVariableDeclaration,
  peekScope,
  type Scope,
  ScopeType,
} from "../tstl-scope/tstl-scope.module.code.ts"
import { assert, castArray } from "../tstl-utils/tstl-utils.module.code.ts"

export type OneToManyVisitorResult<T extends luaCore.Node> = T | readonly T[] | undefined
export function unwrapVisitorResult<T extends luaCore.Node>(
  result: OneToManyVisitorResult<T>
): readonly T[] {
  return result === undefined ? [] : castArray(result)
}

function isReadonlyArrayValue<T>(value: T | readonly T[]): value is readonly T[] {
  return Array.isArray(value)
}

function hasNameProperty(node: ts.Node): node is ts.Node & { name: ts.Node | undefined } {
  return "name" in node
}

export function createSelfIdentifier(tsOriginal?: ts.Node): luaExpressions.Identifier {
  return luaExpressions.createIdentifier("self", tsOriginal, undefined, "this")
}

export function addToNumericExpression(
  expression: luaExpressions.Expression,
  change: number
): luaExpressions.Expression {
  if (change === 0) return expression

  const literalValue = getNumberLiteralValue(expression)
  if (literalValue !== undefined) {
    const newNode = luaExpressions.createNumericLiteral(literalValue + change)
    luaCore.setNodePosition(newNode, expression)
    return newNode
  }

  if (luaExpressions.isBinaryExpression(expression)) {
    if (
      luaExpressions.isNumericLiteral(expression.right) &&
      ((expression.operator === luaCore.SyntaxKind.SubtractionOperator &&
        expression.right.value === change) ||
        (expression.operator === luaCore.SyntaxKind.AdditionOperator &&
          expression.right.value === -change))
    ) {
      return expression.left
    }
  }

  return change > 0
    ? luaExpressions.createBinaryExpression(
        expression,
        luaExpressions.createNumericLiteral(change),
        luaCore.SyntaxKind.AdditionOperator
      )
    : luaExpressions.createBinaryExpression(
        expression,
        luaExpressions.createNumericLiteral(-change),
        luaCore.SyntaxKind.SubtractionOperator
      )
}

export function getNumberLiteralValue(expression?: luaExpressions.Expression) {
  if (!expression) return undefined

  if (luaExpressions.isNumericLiteral(expression)) return expression.value

  if (
    luaExpressions.isUnaryExpression(expression) &&
    expression.operator === luaCore.SyntaxKind.NegationOperator &&
    luaExpressions.isNumericLiteral(expression.operand)
  ) {
    return -expression.operand.value
  }

  return undefined
}

export function createUnpackCall(
  context: TransformationContext,
  expression: luaExpressions.Expression,
  tsOriginal?: ts.Node
): luaExpressions.Expression {
  if (context.luaTarget === LuaTarget.Universal) {
    return transformLuaLibFunction(context, LuaLibFeature.Unpack, tsOriginal, expression)
  }

  const unpack =
    context.luaTarget === LuaTarget.Lua50 ||
    context.luaTarget === LuaTarget.Lua51 ||
    context.luaTarget === LuaTarget.LuaJIT
      ? luaExpressions.createIdentifier("unpack")
      : luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("table"),
          luaExpressions.createStringLiteral("unpack")
        )

  return luaCore.setNodeFlags(
    luaExpressions.createCallExpression(unpack, [expression], tsOriginal),
    luaCore.NodeFlags.TableUnpackCall
  )
}

export function createBoundedUnpackCall(
  context: TransformationContext,
  expression: luaExpressions.Expression,
  maxUnpackItem: number,
  tsOriginal?: ts.Node
): luaExpressions.Expression {
  if (context.luaTarget === LuaTarget.Universal) {
    return transformLuaLibFunction(context, LuaLibFeature.Unpack, tsOriginal, expression)
  }

  const extraArgs =
    context.luaTarget === LuaTarget.Lua50
      ? []
      : [luaExpressions.createNumericLiteral(1), luaExpressions.createNumericLiteral(maxUnpackItem)]

  const unpack =
    context.luaTarget === LuaTarget.Lua50 ||
    context.luaTarget === LuaTarget.Lua51 ||
    context.luaTarget === LuaTarget.LuaJIT
      ? luaExpressions.createIdentifier("unpack")
      : luaExpressions.createTableIndexExpression(
          luaExpressions.createIdentifier("table"),
          luaExpressions.createStringLiteral("unpack")
        )

  return luaCore.setNodeFlags(
    luaExpressions.createCallExpression(unpack, [expression, ...extraArgs], tsOriginal),
    luaCore.NodeFlags.TableUnpackCall
  )
}

export function isUnpackCall(node: luaCore.Node): node is luaExpressions.CallExpression {
  return (
    luaExpressions.isCallExpression(node) && (node.flags & luaCore.NodeFlags.TableUnpackCall) !== 0
  )
}

export function wrapInTable(
  ...expressions: readonly luaExpressions.Expression[]
): luaExpressions.TableExpression {
  const fields = expressions.map((e) => luaExpressions.createTableFieldExpression(e))
  return luaExpressions.createTableExpression(fields)
}

export function wrapInToStringForConcat(
  expression: luaExpressions.Expression
): luaExpressions.Expression {
  if (
    luaExpressions.isStringLiteral(expression) ||
    luaExpressions.isNumericLiteral(expression) ||
    (luaExpressions.isBinaryExpression(expression) &&
      expression.operator === luaCore.SyntaxKind.ConcatOperator)
  ) {
    return expression
  }

  return luaExpressions.createCallExpression(luaExpressions.createIdentifier("tostring"), [
    expression,
  ])
}

export function createHoistableVariableDeclarationStatement(
  context: TransformationContext,
  identifier: luaExpressions.Identifier,
  initializer?: luaExpressions.Expression,
  tsOriginal?: ts.Node
): luaStatements.AssignmentStatement | luaStatements.VariableDeclarationStatement {
  const declaration = luaStatements.createVariableDeclarationStatement(
    identifier,
    initializer,
    tsOriginal
  )
  if (identifier.symbolId !== undefined) {
    const scope = peekScope(context)
    assert(scope.type !== ScopeType.Switch)
    addScopeVariableDeclaration(scope, declaration)
  }

  return declaration
}

function hasMultipleReferences(
  scope: Scope,
  identifiers: luaExpressions.Identifier | readonly luaExpressions.Identifier[]
) {
  const scopeSymbols = scope.referencedSymbols
  if (!scopeSymbols) {
    return false
  }

  const referenceLists = castArray(identifiers).map(
    (i) => i.symbolId && scopeSymbols.get(i.symbolId)
  )

  return referenceLists.some((symbolRefs) => symbolRefs && symbolRefs.length > 1)
}

export function createLocalOrExportedOrGlobalDeclaration(
  context: TransformationContext,
  lhs: luaExpressions.Identifier | readonly luaExpressions.Identifier[],
  rhs?: luaExpressions.Expression | readonly luaExpressions.Expression[],
  tsOriginal?: ts.Node,
  overrideExportScope?: ts.SourceFile | ts.ModuleDeclaration
): readonly luaStatements.Statement[] {
  let declaration: luaStatements.VariableDeclarationStatement | undefined
  let assignment: luaStatements.AssignmentStatement | undefined

  const noImplicitGlobalVariables = context.options.noImplicitGlobalVariables === true

  const isFunctionDeclaration = tsOriginal !== undefined && ts.isFunctionDeclaration(tsOriginal)

  const identifiers = castArray(lhs)
  const [firstIdentifier] = identifiers
  if (firstIdentifier === undefined) {
    return []
  }

  const exportScope = overrideExportScope ?? getIdentifierExportScope(context, firstIdentifier)
  if (exportScope) {
    if (!rhs) {
      return []
    } else {
      assignment = luaStatements.createAssignmentStatement(
        identifiers.map((identifier) => createExportedIdentifier(context, identifier, exportScope)),
        rhs,
        tsOriginal
      )
    }
  } else {
    const scope = peekScope(context)
    const isTopLevelVariable = scope.type === ScopeType.File

    if (context.isModule || !isTopLevelVariable || noImplicitGlobalVariables) {
      const isLuaFunctionExpression =
        rhs !== undefined && !isReadonlyArrayValue(rhs) && luaExpressions.isFunctionExpression(rhs)
      const isSafeRecursiveFunctionDeclaration = isFunctionDeclaration && isLuaFunctionExpression
      if (!isSafeRecursiveFunctionDeclaration && hasMultipleReferences(scope, lhs)) {
        const precedingDeclaration = luaStatements.createVariableDeclarationStatement(
          lhs,
          undefined,
          tsOriginal
        )
        context.prependPrecedingStatements(precedingDeclaration)
        if (rhs) {
          assignment = luaStatements.createAssignmentStatement(lhs, rhs, tsOriginal)
        }

        addScopeVariableDeclaration(scope, precedingDeclaration)
      } else {
        declaration = luaStatements.createVariableDeclarationStatement(lhs, rhs, tsOriginal)

        if (!isFunctionDeclaration) {
          addScopeVariableDeclaration(scope, declaration)
        }
      }
    } else if (rhs) {
      assignment = luaStatements.createAssignmentStatement(lhs, rhs, tsOriginal)
    } else {
      return []
    }
  }

  if (isFunctionDeclaration && !isReadonlyArrayValue(lhs)) {
    const functionSymbolId = lhs.symbolId
    const scope = peekScope(context)
    if (functionSymbolId && scope.functionDefinitions) {
      const definitions = scope.functionDefinitions.get(functionSymbolId)
      if (definitions) {
        definitions.definition = declaration ?? assignment
      }
    }
  }

  setJSDocComments(context, tsOriginal, declaration, assignment)

  if (declaration && assignment) {
    return [declaration, assignment]
  } else if (declaration) {
    return [declaration]
  } else if (assignment) {
    return [assignment]
  } else {
    return []
  }
}

function setJSDocComments(
  context: TransformationContext,
  tsOriginal: ts.Node | undefined,
  declaration: luaStatements.VariableDeclarationStatement | undefined,
  assignment: luaStatements.AssignmentStatement | undefined
) {
  if (context.options.removeComments) {
    return
  }

  const docCommentArray = getJSDocCommentFromTSNode(context, tsOriginal)
  if (docCommentArray === undefined) {
    return
  }

  if (declaration && assignment) {
    declaration.leadingComments = docCommentArray
  } else if (declaration) {
    declaration.leadingComments = docCommentArray
  } else if (assignment) {
    assignment.leadingComments = docCommentArray
  }
}

function getJSDocCommentFromTSNode(
  context: TransformationContext,
  tsOriginal: ts.Node | undefined
): readonly string[] | undefined {
  if (tsOriginal === undefined) {
    return undefined
  }

  if (!hasNameProperty(tsOriginal) || tsOriginal.name === undefined) {
    return undefined
  }

  const symbol = context.checker.getSymbolAtLocation(tsOriginal.name)
  if (symbol === undefined) {
    return undefined
  }

  const docCommentArray = symbol.getDocumentationComment(context.checker)
  const docCommentText = ts.displayPartsToString(docCommentArray).trim()

  const jsDocTagInfoArray = symbol.getJsDocTags(context.checker)
  const jsDocTagsTextLines = jsDocTagInfoArray.map((jsDocTagInfo) => {
    let text = "@" + jsDocTagInfo.name
    if (jsDocTagInfo.text !== undefined) {
      const tagDescriptionTextArray = jsDocTagInfo.text
        .filter((symbolDisplayPart) => symbolDisplayPart.text.trim() !== "")
        .map((symbolDisplayPart) => symbolDisplayPart.text.trim())
      const tagDescriptionText = tagDescriptionTextArray.join(" ")
      text += " " + tagDescriptionText
    }
    return text
  })
  const jsDocTagsText = jsDocTagsTextLines.join("\n")

  const combined = (docCommentText + "\n\n" + jsDocTagsText).trim()
  if (combined === "") {
    return undefined
  }

  const linesWithoutSpace = combined.split("\n")
  const lines = linesWithoutSpace.map((line) => ` ${line}`)

  if (lines.length > 0) {
    const firstLine = lines[0]
    if (firstLine === undefined) return undefined
    if (firstLine.startsWith(" @")) {
      lines.unshift("-")
    } else {
      lines.shift()
      lines.unshift("-" + firstLine)
    }

    return lines
  }
}

export const createNaN = (tsOriginal?: ts.Node) =>
  luaExpressions.createBinaryExpression(
    luaExpressions.createNumericLiteral(0),
    luaExpressions.createNumericLiteral(0),
    luaCore.SyntaxKind.DivisionOperator,
    tsOriginal
  )
