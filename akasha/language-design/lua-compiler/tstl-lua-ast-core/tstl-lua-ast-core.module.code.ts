import * as ts from "typescript"

export const SyntaxKind = {
  File: 0,
  Block: 1,

  DoStatement: 2,
  VariableDeclarationStatement: 3,
  AssignmentStatement: 4,
  IfStatement: 5,
  WhileStatement: 6,
  RepeatStatement: 7,
  ForStatement: 8,
  ForInStatement: 9,
  GotoStatement: 10,
  LabelStatement: 11,
  ReturnStatement: 12,
  BreakStatement: 13,
  ContinueStatement: 14,
  ExpressionStatement: 15,

  StringLiteral: 16,
  NumericLiteral: 17,
  NilKeyword: 18,
  DotsKeyword: 19,
  ArgKeyword: 20,
  TrueKeyword: 21,
  FalseKeyword: 22,
  FunctionExpression: 23,
  TableFieldExpression: 24,
  TableExpression: 25,
  UnaryExpression: 26,
  BinaryExpression: 27,
  CallExpression: 28,
  MethodCallExpression: 29,
  Identifier: 30,
  TableIndexExpression: 31,
  ParenthesizedExpression: 32,
  ConditionalExpression: 33,

  AdditionOperator: 34,
  SubtractionOperator: 35,
  MultiplicationOperator: 36,
  DivisionOperator: 37,
  FloorDivisionOperator: 38,
  ModuloOperator: 39,
  PowerOperator: 40,
  NegationOperator: 41,

  ConcatOperator: 42,

  LengthOperator: 43,

  EqualityOperator: 44,
  InequalityOperator: 45,
  LessThanOperator: 46,
  LessEqualOperator: 47,
  GreaterThanOperator: 48,
  GreaterEqualOperator: 49,

  AndOperator: 50,
  OrOperator: 51,
  NotOperator: 52,

  BitwiseAndOperator: 53,
  BitwiseOrOperator: 54,
  BitwiseExclusiveOrOperator: 55,
  BitwiseRightShiftOperator: 56,
  BitwiseLeftShiftOperator: 57,
  BitwiseNotOperator: 58,
} as const
export type SyntaxKind = (typeof SyntaxKind)[keyof typeof SyntaxKind]

export const SyntaxKindName: readonly string[] = [
  "File",
  "Block",
  "DoStatement",
  "VariableDeclarationStatement",
  "AssignmentStatement",
  "IfStatement",
  "WhileStatement",
  "RepeatStatement",
  "ForStatement",
  "ForInStatement",
  "GotoStatement",
  "LabelStatement",
  "ReturnStatement",
  "BreakStatement",
  "ContinueStatement",
  "ExpressionStatement",
  "StringLiteral",
  "NumericLiteral",
  "NilKeyword",
  "DotsKeyword",
  "ArgKeyword",
  "TrueKeyword",
  "FalseKeyword",
  "FunctionExpression",
  "TableFieldExpression",
  "TableExpression",
  "UnaryExpression",
  "BinaryExpression",
  "CallExpression",
  "MethodCallExpression",
  "Identifier",
  "TableIndexExpression",
  "ParenthesizedExpression",
  "ConditionalExpression",
  "AdditionOperator",
  "SubtractionOperator",
  "MultiplicationOperator",
  "DivisionOperator",
  "FloorDivisionOperator",
  "ModuloOperator",
  "PowerOperator",
  "NegationOperator",
  "ConcatOperator",
  "LengthOperator",
  "EqualityOperator",
  "InequalityOperator",
  "LessThanOperator",
  "LessEqualOperator",
  "GreaterThanOperator",
  "GreaterEqualOperator",
  "AndOperator",
  "OrOperator",
  "NotOperator",
  "BitwiseAndOperator",
  "BitwiseOrOperator",
  "BitwiseExclusiveOrOperator",
  "BitwiseRightShiftOperator",
  "BitwiseLeftShiftOperator",
  "BitwiseNotOperator",
]

export type UnaryBitwiseOperator = typeof SyntaxKind.BitwiseNotOperator

export type UnaryOperator =
  | typeof SyntaxKind.NegationOperator
  | typeof SyntaxKind.LengthOperator
  | typeof SyntaxKind.NotOperator
  | UnaryBitwiseOperator

export type BinaryBitwiseOperator =
  | typeof SyntaxKind.BitwiseAndOperator
  | typeof SyntaxKind.BitwiseOrOperator
  | typeof SyntaxKind.BitwiseExclusiveOrOperator
  | typeof SyntaxKind.BitwiseRightShiftOperator
  | typeof SyntaxKind.BitwiseLeftShiftOperator

export type BinaryOperator =
  | typeof SyntaxKind.AdditionOperator
  | typeof SyntaxKind.SubtractionOperator
  | typeof SyntaxKind.MultiplicationOperator
  | typeof SyntaxKind.DivisionOperator
  | typeof SyntaxKind.FloorDivisionOperator
  | typeof SyntaxKind.ModuloOperator
  | typeof SyntaxKind.PowerOperator
  | typeof SyntaxKind.ConcatOperator
  | typeof SyntaxKind.EqualityOperator
  | typeof SyntaxKind.InequalityOperator
  | typeof SyntaxKind.LessThanOperator
  | typeof SyntaxKind.LessEqualOperator
  | typeof SyntaxKind.GreaterThanOperator
  | typeof SyntaxKind.GreaterEqualOperator
  | typeof SyntaxKind.AndOperator
  | typeof SyntaxKind.OrOperator
  | BinaryBitwiseOperator

export type Operator = UnaryOperator | BinaryOperator

export type SymbolId = number & { _symbolIdBrand: any }

export function SymbolId(id: number): SymbolId {
  return id as SymbolId
}

export const NodeFlags = {
  None: 0,
  Inline: 1 << 0,
  Declaration: 1 << 1,
  TableUnpackCall: 1 << 2,
} as const
export type NodeFlags = number

export interface TextRange {
  line?: number
  column?: number
}

export interface Node extends TextRange {
  kind: SyntaxKind
  flags: NodeFlags
}

export type NodeKindMap = {}

export function cloneNode<T extends Node>(node: T): T {
  return { ...node }
}

export function setNodePosition<T extends Node>(node: T, position: TextRange): T {
  node.line = position.line
  node.column = position.column

  return node
}

export function setNodeOriginal<T extends Node>(node: T, tsOriginal: ts.Node): T
export function setNodeOriginal<T extends Node>(
  node: T | undefined,
  tsOriginal: ts.Node
): T | undefined
export function setNodeOriginal<T extends Node>(
  node: T | undefined,
  tsOriginal: ts.Node
): T | undefined {
  if (node === undefined) {
    return undefined
  }

  const sourcePosition = getSourcePosition(tsOriginal)
  if (sourcePosition) {
    setNodePosition(node, sourcePosition)
  }

  return node
}

export function setNodePositionFromTs<T extends Node>(node: T, tsOriginal?: ts.Node): T {
  if (tsOriginal === undefined) return node
  const sourcePosition = getSourcePosition(tsOriginal)
  if (sourcePosition) {
    node.line = sourcePosition.line
    node.column = sourcePosition.column
  }
  return node
}

function getSourcePosition(sourceNode: ts.Node): TextRange | undefined {
  const parseTreeNode = ts.getParseTreeNode(sourceNode) ?? sourceNode
  const sourceFile = parseTreeNode.getSourceFile()
  if (sourceFile !== undefined && parseTreeNode.pos >= 0) {
    const { line, character } = ts.getLineAndCharacterOfPosition(
      sourceFile,
      parseTreeNode.pos + parseTreeNode.getLeadingTriviaWidth()
    )

    return { line, column: character }
  }
}

export function getOriginalPos(node: Node): TextRange {
  return { line: node.line, column: node.column }
}

export function setNodeFlags<T extends Node>(node: T, flags: NodeFlags): T {
  node.flags = flags
  return node
}
