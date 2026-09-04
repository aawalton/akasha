import type { SourceNode } from "source-map"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  concatNodes,
  createSourceNode,
  indent,
  joinChunksWithComma,
  type LuaPrinterState,
  popIndent,
  printBlock,
  printComment,
  printStatementArray,
  pushIndent,
} from "../tstl-lua-printer-core/tstl-lua-printer-core.module.code.ts"
import {
  isValidLuaFunctionDeclarationName,
  type SourceChunk,
} from "../tstl-lua-printer-helpers/tstl-lua-printer-helpers.module.code.ts"

export function printStatement(
  state: LuaPrinterState,
  statement: luaStatements.Statement
): SourceNode {
  let resultNode = printStatementExcludingComments(state, statement)

  if (statement.leadingComments) {
    resultNode = concatNodes(
      state,
      statement.leadingComments.map((c) => printComment(state, c)).join("\n"),
      "\n",
      resultNode
    )
  }

  if (statement.trailingComments) {
    resultNode = concatNodes(
      state,
      resultNode,
      "\n",
      statement.trailingComments.map((c) => printComment(state, c)).join("\n")
    )
  }

  return resultNode
}

function printStatementExcludingComments(
  state: LuaPrinterState,
  statement: luaStatements.Statement
): SourceNode {
  switch (statement.kind) {
    case luaCore.SyntaxKind.DoStatement:
      return printDoStatement(state, statement)
    case luaCore.SyntaxKind.VariableDeclarationStatement:
      return printVariableDeclarationStatement(state, statement)
    case luaCore.SyntaxKind.AssignmentStatement:
      return printVariableAssignmentStatement(state, statement)
    case luaCore.SyntaxKind.IfStatement:
      return printIfStatement(state, statement)
    case luaCore.SyntaxKind.WhileStatement:
      return printWhileStatement(state, statement)
    case luaCore.SyntaxKind.RepeatStatement:
      return printRepeatStatement(state, statement)
    case luaCore.SyntaxKind.ForStatement:
      return printForStatement(state, statement)
    case luaCore.SyntaxKind.ForInStatement:
      return printForInStatement(state, statement)
    case luaCore.SyntaxKind.GotoStatement:
      return printGotoStatement(state, statement)
    case luaCore.SyntaxKind.LabelStatement:
      return printLabelStatement(state, statement)
    case luaCore.SyntaxKind.ReturnStatement:
      return printReturnStatement(state, statement)
    case luaCore.SyntaxKind.BreakStatement:
      return printBreakStatement(state, statement)
    case luaCore.SyntaxKind.ContinueStatement:
      return printContinueStatement(state, statement)
    case luaCore.SyntaxKind.ExpressionStatement:
      return printExpressionStatement(state, statement)
    default: {
      const node: luaCore.Node = statement
      throw new Error(`Tried to print unknown statement kind: ${luaCore.SyntaxKindName[node.kind]}`)
    }
  }
}

export function printDoStatement(
  state: LuaPrinterState,
  statement: luaStatements.DoStatement
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(indent(state, "do\n"))
  pushIndent(state)
  chunks.push(...printStatementArray(state, statement.statements))
  popIndent(state)
  chunks.push(indent(state, "end"))

  return concatNodes(state, ...chunks)
}

export function printVariableDeclarationStatement(
  state: LuaPrinterState,
  statement: luaStatements.VariableDeclarationStatement
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(indent(state, "local "))

  if (luaExpressions.isFunctionDefinition(statement)) {
    chunks.push(state.printers.printFunctionDefinition(statement))
  } else {
    chunks.push(
      ...joinChunksWithComma(statement.left.map((e) => state.printers.printExpression(e)))
    )

    if (statement.right) {
      chunks.push(" = ")
      chunks.push(
        ...joinChunksWithComma(statement.right.map((e) => state.printers.printExpression(e)))
      )
    }
  }

  return createSourceNode(state, statement, chunks)
}

export function printVariableAssignmentStatement(
  state: LuaPrinterState,
  statement: luaStatements.AssignmentStatement
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(indent(state))

  if (
    luaExpressions.isFunctionDefinition(statement) &&
    (statement.right[0].flags & luaCore.NodeFlags.Declaration) !== 0
  ) {
    const name = state.printers.printExpression(statement.left[0])
    if (isValidLuaFunctionDeclarationName(name.toString(), state.options)) {
      chunks.push(state.printers.printFunctionDefinition(statement))
      return createSourceNode(state, statement, chunks)
    }
  }

  chunks.push(...joinChunksWithComma(statement.left.map((e) => state.printers.printExpression(e))))
  chunks.push(" = ")
  chunks.push(...joinChunksWithComma(statement.right.map((e) => state.printers.printExpression(e))))

  return createSourceNode(state, statement, chunks)
}

export function printIfStatement(
  state: LuaPrinterState,
  statement: luaStatements.IfStatement,
  isElseIf = false
): SourceNode {
  const chunks: SourceChunk[] = []

  const prefix = isElseIf ? "elseif" : "if"
  chunks.push(
    indent(state, prefix + " "),
    state.printers.printExpression(statement.condition),
    " then\n"
  )

  pushIndent(state)
  chunks.push(printBlock(state, statement.ifBlock))
  popIndent(state)

  if (statement.elseBlock) {
    if (luaStatements.isIfStatement(statement.elseBlock)) {
      chunks.push(printIfStatement(state, statement.elseBlock, true))
    } else {
      chunks.push(indent(state, "else\n"))
      pushIndent(state)
      chunks.push(printBlock(state, statement.elseBlock))
      popIndent(state)
      chunks.push(indent(state, "end"))
    }
  } else {
    chunks.push(indent(state, "end"))
  }

  return concatNodes(state, ...chunks)
}

export function printWhileStatement(
  state: LuaPrinterState,
  statement: luaStatements.WhileStatement
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(indent(state, "while "), state.printers.printExpression(statement.condition), " do\n")

  pushIndent(state)
  chunks.push(printBlock(state, statement.body))
  popIndent(state)

  chunks.push(indent(state, "end"))

  return concatNodes(state, ...chunks)
}

export function printRepeatStatement(
  state: LuaPrinterState,
  statement: luaStatements.RepeatStatement
): SourceNode {
  const chunks: SourceChunk[] = []

  chunks.push(indent(state, "repeat\n"))

  pushIndent(state)
  chunks.push(printBlock(state, statement.body))
  popIndent(state)

  chunks.push(indent(state, "until "), state.printers.printExpression(statement.condition))

  return concatNodes(state, ...chunks)
}

export function printForStatement(
  state: LuaPrinterState,
  statement: luaStatements.ForStatement
): SourceNode {
  const ctrlVar = state.printers.printExpression(statement.controlVariable)
  const ctrlVarInit = state.printers.printExpression(statement.controlVariableInitializer)
  const limit = state.printers.printExpression(statement.limitExpression)

  const chunks: SourceChunk[] = []

  chunks.push(indent(state, "for "), ctrlVar, " = ", ctrlVarInit, ", ", limit)

  if (statement.stepExpression) {
    chunks.push(", ", state.printers.printExpression(statement.stepExpression))
  }
  chunks.push(" do\n")

  pushIndent(state)
  chunks.push(printBlock(state, statement.body))
  popIndent(state)

  chunks.push(indent(state, "end"))

  return concatNodes(state, ...chunks)
}

export function printForInStatement(
  state: LuaPrinterState,
  statement: luaStatements.ForInStatement
): SourceNode {
  const names = joinChunksWithComma(statement.names.map((i) => state.printers.printIdentifier(i)))
  const expressions = joinChunksWithComma(
    statement.expressions.map((e) => state.printers.printExpression(e))
  )

  const chunks: SourceChunk[] = []

  chunks.push(indent(state, "for "), ...names, " in ", ...expressions, " do\n")

  pushIndent(state)
  chunks.push(printBlock(state, statement.body))
  popIndent(state)
  chunks.push(indent(state, "end"))

  return createSourceNode(state, statement, chunks)
}

export function printGotoStatement(
  state: LuaPrinterState,
  statement: luaStatements.GotoStatement
): SourceNode {
  return createSourceNode(state, statement, [indent(state, "goto "), statement.label])
}

export function printLabelStatement(
  state: LuaPrinterState,
  statement: luaStatements.LabelStatement
): SourceNode {
  return createSourceNode(state, statement, [indent(state, "::"), statement.name, "::"])
}

export function printReturnStatement(
  state: LuaPrinterState,
  statement: luaStatements.ReturnStatement
): SourceNode {
  if (statement.expressions.length === 0) {
    return createSourceNode(state, statement, indent(state, "return"))
  }

  const chunks: SourceChunk[] = []

  chunks.push(
    ...joinChunksWithComma(statement.expressions.map((e) => state.printers.printExpression(e)))
  )

  return createSourceNode(state, statement, [indent(state), "return ", ...chunks])
}

export function printBreakStatement(
  state: LuaPrinterState,
  statement: luaStatements.BreakStatement
): SourceNode {
  return createSourceNode(state, statement, indent(state, "break"))
}

export function printContinueStatement(
  state: LuaPrinterState,
  statement: luaStatements.ContinueStatement
): SourceNode {
  return createSourceNode(state, statement, indent(state, "continue"))
}

export function printExpressionStatement(
  state: LuaPrinterState,
  statement: luaStatements.ExpressionStatement
): SourceNode {
  return createSourceNode(state, statement, [
    indent(state),
    state.printers.printExpression(statement.expression),
  ])
}
