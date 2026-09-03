import { SourceNode } from "source-map"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import {
  concatNodes,
  createSourceNode,
  indent,
  joinChunksWithComma,
  type LuaPrinterState,
  popIndent,
  printBlock,
  pushIndent,
} from "../tstl-lua-printer-core/tstl-lua-printer-core.module.code.ts"
import {
  escapeString,
  isSimpleExpression,
  operatorMap,
  operatorPrecedence,
  rightAssociativeOperators,
  type SourceChunk,
} from "../tstl-lua-printer-helpers/tstl-lua-printer-helpers.module.code.ts"
import { isValidLuaIdentifier } from "../tstl-safe-names/tstl-safe-names.module.code.ts"

export function printExpression(
  state: LuaPrinterState,
  expression: luaExpressions.Expression
): SourceNode {
  switch (expression.kind) {
    case luaCore.SyntaxKind.StringLiteral:
      return printStringLiteral(state, expression)
    case luaCore.SyntaxKind.NumericLiteral:
      return printNumericLiteral(state, expression)
    case luaCore.SyntaxKind.NilKeyword:
      return printNilLiteral(state, expression)
    case luaCore.SyntaxKind.DotsKeyword:
      return printDotsLiteral(state, expression)
    case luaCore.SyntaxKind.ArgKeyword:
      return printArgLiteral(state, expression)
    case luaCore.SyntaxKind.TrueKeyword:
    case luaCore.SyntaxKind.FalseKeyword:
      return printBooleanLiteral(state, expression)
    case luaCore.SyntaxKind.FunctionExpression:
      return printFunctionExpression(state, expression)
    case luaCore.SyntaxKind.TableFieldExpression:
      return printTableFieldExpression(state, expression)
    case luaCore.SyntaxKind.TableExpression:
      return printTableExpression(state, expression)
    case luaCore.SyntaxKind.UnaryExpression:
      return printUnaryExpression(state, expression)
    case luaCore.SyntaxKind.BinaryExpression:
      return printBinaryExpression(state, expression)
    case luaCore.SyntaxKind.CallExpression:
      return printCallExpression(state, expression)
    case luaCore.SyntaxKind.MethodCallExpression:
      return printMethodCallExpression(state, expression)
    case luaCore.SyntaxKind.Identifier:
      return state.printers.printIdentifier(expression)
    case luaCore.SyntaxKind.TableIndexExpression:
      return state.printers.printTableIndexExpression(expression)
    case luaCore.SyntaxKind.ParenthesizedExpression:
      return printParenthesizedExpression(state, expression)
    case luaCore.SyntaxKind.ConditionalExpression:
      return printConditionalExpression(state, expression)
    default: {
      const node: luaCore.Node = expression
      throw new Error(`Tried to print unknown statement kind: ${luaCore.SyntaxKindName[node.kind]}`)
    }
  }
}

export function printStringLiteral(
  state: LuaPrinterState,
  expression: luaExpressions.StringLiteral
): SourceNode {
  return createSourceNode(state, expression, escapeString(expression.value))
}

export function printNumericLiteral(
  state: LuaPrinterState,
  expression: luaExpressions.NumericLiteral
): SourceNode {
  return createSourceNode(state, expression, String(expression.value))
}

export function printNilLiteral(
  state: LuaPrinterState,
  expression: luaExpressions.NilLiteral
): SourceNode {
  return createSourceNode(state, expression, "nil")
}

export function printDotsLiteral(
  state: LuaPrinterState,
  expression: luaExpressions.DotsLiteral
): SourceNode {
  return createSourceNode(state, expression, "...")
}

export function printArgLiteral(
  state: LuaPrinterState,
  expression: luaExpressions.ArgLiteral
): SourceNode {
  return createSourceNode(state, expression, "arg")
}

export function printBooleanLiteral(
  state: LuaPrinterState,
  expression: luaExpressions.BooleanLiteral
): SourceNode {
  return createSourceNode(
    state,
    expression,
    expression.kind === luaCore.SyntaxKind.TrueKeyword ? "true" : "false"
  )
}

function printFunctionParameters(
  state: LuaPrinterState,
  expression: luaExpressions.FunctionExpression
): readonly SourceChunk[] {
  const parameterChunks = (expression.params ?? []).map((i) => state.printers.printIdentifier(i))

  if (expression.dots) {
    parameterChunks.push(printDotsLiteral(state, expression.dots))
  }

  return joinChunksWithComma(parameterChunks)
}

export function printFunctionExpression(
  state: LuaPrinterState,
  expression: luaExpressions.FunctionExpression
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push("function(")
  chunks.push(...printFunctionParameters(state, expression))
  chunks.push(")")

  if (luaExpressions.isInlineFunctionExpression(expression)) {
    const returnStatement = expression.body.statements[0]
    chunks.push(" ")
    const returnNode: SourceChunk[] = [
      "return ",
      ...joinChunksWithComma(
        returnStatement.expressions.map((e) => state.printers.printExpression(e))
      ),
    ]
    chunks.push(createSourceNode(state, returnStatement, returnNode))
    chunks.push(createSourceNode(state, expression, " end"))
  } else {
    chunks.push("\n")
    pushIndent(state)
    chunks.push(printBlock(state, expression.body))
    popIndent(state)
    chunks.push(indent(state, createSourceNode(state, expression, "end")))
  }

  return createSourceNode(state, expression, chunks)
}

export function printFunctionDefinition(
  state: LuaPrinterState,
  statement: luaExpressions.FunctionDefinition
): SourceNode {
  const expression = statement.right[0]
  const chunks: SourceChunk[] = []

  chunks.push("function ")
  chunks.push(state.printers.printExpression(statement.left[0]))
  chunks.push("(")
  chunks.push(...printFunctionParameters(state, expression))
  chunks.push(")\n")

  pushIndent(state)
  chunks.push(printBlock(state, expression.body))
  popIndent(state)
  chunks.push(indent(state, createSourceNode(state, statement, "end")))

  return createSourceNode(state, expression, chunks)
}

export function printTableFieldExpression(
  state: LuaPrinterState,
  expression: luaExpressions.TableFieldExpression
): SourceNode {
  const chunks: SourceChunk[] = []

  const value = state.printers.printExpression(expression.value)

  if (expression.key) {
    if (
      luaExpressions.isStringLiteral(expression.key) &&
      isValidLuaIdentifier(expression.key.value, state.options)
    ) {
      chunks.push(expression.key.value, " = ", value)
    } else {
      chunks.push("[", state.printers.printExpression(expression.key), "] = ", value)
    }
  } else {
    chunks.push(value)
  }

  return createSourceNode(state, expression, chunks)
}

export function printTableExpression(
  state: LuaPrinterState,
  expression: luaExpressions.TableExpression
): SourceNode {
  return createSourceNode(state, expression, [
    "{",
    ...printExpressionList(state, expression.fields),
    "}",
  ])
}

export function printUnaryExpression(
  state: LuaPrinterState,
  expression: luaExpressions.UnaryExpression
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(printOperator(state, expression.operator))
  chunks.push(
    printExpressionInParenthesesIfNeeded(
      state,
      expression.operand,
      operatorPrecedence[expression.operator]
    )
  )

  return createSourceNode(state, expression, chunks)
}

export function printBinaryExpression(
  state: LuaPrinterState,
  expression: luaExpressions.BinaryExpression
): SourceNode {
  const chunks: SourceChunk[] = []
  const isRightAssociative = rightAssociativeOperators.has(expression.operator)
  const precedence = operatorPrecedence[expression.operator]
  chunks.push(
    printExpressionInParenthesesIfNeeded(
      state,
      expression.left,
      isRightAssociative ? precedence + 1 : precedence
    )
  )
  chunks.push(" ", printOperator(state, expression.operator), " ")
  chunks.push(
    printExpressionInParenthesesIfNeeded(
      state,
      expression.right,
      isRightAssociative ? precedence : precedence + 1
    )
  )

  return createSourceNode(state, expression, chunks)
}

function printExpressionInParenthesesIfNeeded(
  state: LuaPrinterState,
  expression: luaExpressions.Expression,
  minPrecedenceToOmit?: number
): SourceNode {
  return needsParenthesis(expression, minPrecedenceToOmit)
    ? createSourceNode(state, expression, ["(", state.printers.printExpression(expression), ")"])
    : state.printers.printExpression(expression)
}

function needsParenthesis(
  expression: luaExpressions.Expression,
  minPrecedenceToOmit?: number
): boolean {
  if (
    luaExpressions.isBinaryExpression(expression) ||
    luaExpressions.isUnaryExpression(expression)
  ) {
    return (
      minPrecedenceToOmit === undefined ||
      operatorPrecedence[expression.operator] < minPrecedenceToOmit
    )
  } else {
    return (
      luaExpressions.isFunctionExpression(expression) ||
      luaExpressions.isTableExpression(expression)
    )
  }
}

export function printCallExpression(
  state: LuaPrinterState,
  expression: luaExpressions.CallExpression
): SourceNode {
  const chunks = []

  chunks.push(printExpressionInParenthesesIfNeeded(state, expression.expression), "(")

  if (expression.params) {
    chunks.push(...printExpressionList(state, expression.params))
  }

  chunks.push(")")

  return createSourceNode(state, expression, chunks)
}

export function printMethodCallExpression(
  state: LuaPrinterState,
  expression: luaExpressions.MethodCallExpression
): SourceNode {
  const chunks = []

  const prefix =
    needsParenthesis(expression.prefixExpression) ||
    luaExpressions.isStringLiteral(expression.prefixExpression)
      ? ["(", state.printers.printExpression(expression.prefixExpression), ")"]
      : [state.printers.printExpression(expression.prefixExpression)]

  const name = state.printers.printIdentifier(expression.name)

  chunks.push(...prefix, ":", name, "(")

  if (expression.params) {
    chunks.push(...printExpressionList(state, expression.params))
  }

  chunks.push(")")

  return createSourceNode(state, expression, chunks)
}

export function printIdentifier(
  state: LuaPrinterState,
  expression: luaExpressions.Identifier
): SourceNode {
  return createSourceNode(
    state,
    expression,
    expression.text,
    expression.originalName !== expression.text ? expression.originalName : undefined
  )
}

export function printTableIndexExpression(
  state: LuaPrinterState,
  expression: luaExpressions.TableIndexExpression
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(printExpressionInParenthesesIfNeeded(state, expression.table))
  if (
    luaExpressions.isStringLiteral(expression.index) &&
    isValidLuaIdentifier(expression.index.value, state.options)
  ) {
    chunks.push(".", createSourceNode(state, expression.index, expression.index.value))
  } else {
    chunks.push("[", state.printers.printExpression(expression.index), "]")
  }
  return createSourceNode(state, expression, chunks)
}

export function printParenthesizedExpression(
  state: LuaPrinterState,
  expression: luaExpressions.ParenthesizedExpression
): SourceNode {
  return createSourceNode(state, expression, [
    "(",
    state.printers.printExpression(expression.expression),
    ")",
  ])
}

export function printConditionalExpression(
  state: LuaPrinterState,
  expression: luaExpressions.ConditionalExpression
): SourceNode {
  return createSourceNode(state, expression, [
    "if ",
    state.printers.printExpression(expression.condition),
    " then ",
    state.printers.printExpression(expression.whenTrue),
    " else ",
    state.printers.printExpression(expression.whenFalse),
  ])
}

export function printOperator(state: LuaPrinterState, kind: luaCore.Operator): SourceNode {
  return new SourceNode(null, null, state.relativeSourcePath, operatorMap[kind])
}

function isSimpleExpressionList(expressions: readonly luaExpressions.Expression[]): boolean {
  if (expressions.length <= 1) return true
  if (expressions.length > 4) return false
  return expressions.every(isSimpleExpression)
}

function printExpressionList(
  state: LuaPrinterState,
  expressions: readonly luaExpressions.Expression[]
): readonly SourceChunk[] {
  const chunks: SourceChunk[] = []

  if (isSimpleExpressionList(expressions)) {
    chunks.push(...joinChunksWithComma(expressions.map((e) => state.printers.printExpression(e))))
  } else {
    chunks.push("\n")
    pushIndent(state)
    for (const [index, expression] of expressions.entries()) {
      const tail = index < expressions.length - 1 ? ",\n" : "\n"
      chunks.push(indent(state), state.printers.printExpression(expression), tail)
    }
    popIndent(state)
    chunks.push(indent(state))
  }

  return chunks
}
