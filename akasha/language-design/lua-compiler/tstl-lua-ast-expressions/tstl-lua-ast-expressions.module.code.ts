import type * as ts from "typescript"
import {
  type BinaryOperator,
  type Node,
  NodeFlags,
  type SymbolId,
  SyntaxKind,
  setNodePositionFromTs,
  type UnaryOperator,
} from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import type { Block } from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import {
  type AssignmentStatement,
  isReturnStatement,
  type ReturnStatement,
  type VariableDeclarationStatement,
} from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

export interface NilLiteral extends Node {
  kind: typeof SyntaxKind.NilKeyword
}

export function isNilLiteral(node: Node): node is NilLiteral {
  return node.kind === SyntaxKind.NilKeyword
}

export function createNilLiteral(tsOriginal?: ts.Node): NilLiteral {
  return setNodePositionFromTs({ kind: SyntaxKind.NilKeyword, flags: NodeFlags.None }, tsOriginal)
}

export interface BooleanLiteral extends Node {
  kind: typeof SyntaxKind.TrueKeyword | typeof SyntaxKind.FalseKeyword
}

export function isBooleanLiteral(node: Node): node is BooleanLiteral {
  return node.kind === SyntaxKind.TrueKeyword || node.kind === SyntaxKind.FalseKeyword
}

export function createBooleanLiteral(value: boolean, tsOriginal?: ts.Node): BooleanLiteral {
  return setNodePositionFromTs(
    {
      kind: value ? SyntaxKind.TrueKeyword : SyntaxKind.FalseKeyword,
      flags: NodeFlags.None,
    },
    tsOriginal
  )
}

export interface DotsLiteral extends Node {
  kind: typeof SyntaxKind.DotsKeyword
}

export function isDotsLiteral(node: Node): node is DotsLiteral {
  return node.kind === SyntaxKind.DotsKeyword
}

export function createDotsLiteral(tsOriginal?: ts.Node): DotsLiteral {
  return setNodePositionFromTs({ kind: SyntaxKind.DotsKeyword, flags: NodeFlags.None }, tsOriginal)
}

export interface ArgLiteral extends Node {
  kind: typeof SyntaxKind.ArgKeyword
}

export function isArgLiteral(node: Node): node is ArgLiteral {
  return node.kind === SyntaxKind.ArgKeyword
}

export function createArgLiteral(tsOriginal?: ts.Node): ArgLiteral {
  return setNodePositionFromTs({ kind: SyntaxKind.ArgKeyword, flags: NodeFlags.None }, tsOriginal)
}

export interface NumericLiteral extends Node {
  kind: typeof SyntaxKind.NumericLiteral
  value: number
}

export function isNumericLiteral(node: Node): node is NumericLiteral {
  return node.kind === SyntaxKind.NumericLiteral
}

export function createNumericLiteral(value: number, tsOriginal?: ts.Node): NumericLiteral {
  return setNodePositionFromTs(
    { kind: SyntaxKind.NumericLiteral, flags: NodeFlags.None, value },
    tsOriginal
  )
}

export interface StringLiteral extends Node {
  kind: typeof SyntaxKind.StringLiteral
  value: string
}

export function isStringLiteral(node: Node): node is StringLiteral {
  return node.kind === SyntaxKind.StringLiteral
}

export function createStringLiteral(value: string, tsOriginal?: ts.Node): StringLiteral {
  return setNodePositionFromTs(
    { kind: SyntaxKind.StringLiteral, flags: NodeFlags.None, value },
    tsOriginal
  )
}

export function isLiteral(
  node: Node
): node is NilLiteral | DotsLiteral | ArgLiteral | BooleanLiteral | NumericLiteral | StringLiteral {
  return (
    isNilLiteral(node) ||
    isDotsLiteral(node) ||
    isArgLiteral(node) ||
    isBooleanLiteral(node) ||
    isNumericLiteral(node) ||
    isStringLiteral(node)
  )
}

export interface FunctionExpression extends Node {
  kind: typeof SyntaxKind.FunctionExpression
  params?: readonly Identifier[]
  dots?: DotsLiteral
  body: Block
}

export function isFunctionExpression(node: Node): node is FunctionExpression {
  return node.kind === SyntaxKind.FunctionExpression
}

export function createFunctionExpression(
  body: Block,
  params?: readonly Identifier[],
  dots?: DotsLiteral,
  flags: NodeFlags = NodeFlags.None,
  tsOriginal?: ts.Node
): FunctionExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.FunctionExpression, flags, body, params, dots },
    tsOriginal
  )
}

export interface TableFieldExpression extends Node {
  kind: typeof SyntaxKind.TableFieldExpression
  value: Expression
  key?: Expression
}

export function isTableFieldExpression(node: Node): node is TableFieldExpression {
  return node.kind === SyntaxKind.TableFieldExpression
}

export function createTableFieldExpression(
  value: Expression,
  key?: Expression,
  tsOriginal?: ts.Node
): TableFieldExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.TableFieldExpression, flags: NodeFlags.None, value, key },
    tsOriginal
  )
}

export interface TableExpression extends Node {
  kind: typeof SyntaxKind.TableExpression
  fields: readonly TableFieldExpression[]
}

export function isTableExpression(node: Node): node is TableExpression {
  return node.kind === SyntaxKind.TableExpression
}

export function createTableExpression(
  fields: readonly TableFieldExpression[] = [],
  tsOriginal?: ts.Node
): TableExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.TableExpression, flags: NodeFlags.None, fields },
    tsOriginal
  )
}

export interface UnaryExpression extends Node {
  kind: typeof SyntaxKind.UnaryExpression
  operand: Expression
  operator: UnaryOperator
}

export function isUnaryExpression(node: Node): node is UnaryExpression {
  return node.kind === SyntaxKind.UnaryExpression
}

export function createUnaryExpression(
  operand: Expression,
  operator: UnaryOperator,
  tsOriginal?: ts.Node
): UnaryExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.UnaryExpression, flags: NodeFlags.None, operand, operator },
    tsOriginal
  )
}

export interface BinaryExpression extends Node {
  kind: typeof SyntaxKind.BinaryExpression
  operator: BinaryOperator
  left: Expression
  right: Expression
}

export function isBinaryExpression(node: Node): node is BinaryExpression {
  return node.kind === SyntaxKind.BinaryExpression
}

export function createBinaryExpression(
  left: Expression,
  right: Expression,
  operator: BinaryOperator,
  tsOriginal?: ts.Node
): BinaryExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.BinaryExpression, flags: NodeFlags.None, left, right, operator },
    tsOriginal
  )
}

export interface CallExpression extends Node {
  kind: typeof SyntaxKind.CallExpression
  expression: Expression
  params: readonly Expression[]
}

export function isCallExpression(node: Node): node is CallExpression {
  return node.kind === SyntaxKind.CallExpression
}

export function createCallExpression(
  expression: Expression,
  params: readonly Expression[],
  tsOriginal?: ts.Node
): CallExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.CallExpression, flags: NodeFlags.None, expression, params },
    tsOriginal
  )
}

export interface MethodCallExpression extends Node {
  kind: typeof SyntaxKind.MethodCallExpression
  prefixExpression: Expression
  name: Identifier
  params: readonly Expression[]
}

export function isMethodCallExpression(node: Node): node is MethodCallExpression {
  return node.kind === SyntaxKind.MethodCallExpression
}

export function createMethodCallExpression(
  prefixExpression: Expression,
  name: Identifier,
  params: readonly Expression[],
  tsOriginal?: ts.Node
): MethodCallExpression {
  return setNodePositionFromTs(
    {
      kind: SyntaxKind.MethodCallExpression,
      flags: NodeFlags.None,
      prefixExpression,
      name,
      params,
    },
    tsOriginal
  )
}

export interface Identifier extends Node {
  kind: typeof SyntaxKind.Identifier
  exportable: boolean
  text: string
  originalName?: string
  symbolId?: SymbolId
}

export function isIdentifier(node: Node): node is Identifier {
  return node.kind === SyntaxKind.Identifier
}

export function createIdentifier(
  text: string,
  tsOriginal?: ts.Node,
  symbolId?: SymbolId,
  originalName?: string
): Identifier {
  return setNodePositionFromTs(
    {
      kind: SyntaxKind.Identifier,
      flags: NodeFlags.None,
      exportable: true,
      text,
      symbolId,
      originalName,
    },
    tsOriginal
  )
}

export function cloneIdentifier(identifier: Identifier, tsOriginal?: ts.Node): Identifier {
  return createIdentifier(identifier.text, tsOriginal, identifier.symbolId, identifier.originalName)
}

export function createAnonymousIdentifier(tsOriginal?: ts.Node): Identifier {
  return setNodePositionFromTs(
    { kind: SyntaxKind.Identifier, flags: NodeFlags.None, exportable: false, text: "____" },
    tsOriginal
  )
}

export interface TableIndexExpression extends Node {
  kind: typeof SyntaxKind.TableIndexExpression
  table: Expression
  index: Expression
}

export function isTableIndexExpression(node: Node): node is TableIndexExpression {
  return node.kind === SyntaxKind.TableIndexExpression
}

export function createTableIndexExpression(
  table: Expression,
  index: Expression,
  tsOriginal?: ts.Node
): TableIndexExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.TableIndexExpression, flags: NodeFlags.None, table, index },
    tsOriginal
  )
}

export type AssignmentLeftHandSideExpression = Identifier | TableIndexExpression

export function isAssignmentLeftHandSideExpression(
  node: Node
): node is AssignmentLeftHandSideExpression {
  return isIdentifier(node) || isTableIndexExpression(node)
}

export type FunctionDefinition =
  | (VariableDeclarationStatement & {
      left: readonly [Identifier]
      right: readonly [FunctionExpression]
    })
  | (AssignmentStatement & {
      left: readonly [AssignmentLeftHandSideExpression]
      right: readonly [FunctionExpression]
    })

export function isFunctionDefinition(
  statement: VariableDeclarationStatement | AssignmentStatement
): statement is FunctionDefinition {
  if (statement.left.length !== 1) return false
  if (statement.right?.length !== 1) return false
  const [right] = statement.right
  return right !== undefined && isFunctionExpression(right)
}

export type InlineFunctionExpression = FunctionExpression & {
  body: { statements: readonly [ReturnStatement & { expressions: readonly Expression[] }] }
}

export function isInlineFunctionExpression(
  expression: FunctionExpression
): expression is InlineFunctionExpression {
  if (expression.body.statements?.length !== 1) return false
  const [first] = expression.body.statements
  if (first === undefined || !isReturnStatement(first)) return false
  if (first.expressions === undefined) return false
  return (expression.flags & NodeFlags.Inline) !== 0
}

export interface ParenthesizedExpression extends Node {
  kind: typeof SyntaxKind.ParenthesizedExpression
  expression: Expression
}

export function isParenthesizedExpression(node: Node): node is ParenthesizedExpression {
  return node.kind === SyntaxKind.ParenthesizedExpression
}

export function createParenthesizedExpression(
  expression: Expression,
  tsOriginal?: ts.Node
): ParenthesizedExpression {
  return setNodePositionFromTs(
    { kind: SyntaxKind.ParenthesizedExpression, flags: NodeFlags.None, expression },
    tsOriginal
  )
}

export interface ConditionalExpression extends Node {
  kind: typeof SyntaxKind.ConditionalExpression
  condition: Expression
  whenTrue: Expression
  whenFalse: Expression
}

export function isConditionalExpression(node: Node): node is ConditionalExpression {
  return node.kind === SyntaxKind.ConditionalExpression
}

export function createConditionalExpression(
  condition: Expression,
  whenTrue: Expression,
  whenFalse: Expression,
  tsOriginal?: ts.Node
): ConditionalExpression {
  return setNodePositionFromTs(
    {
      kind: SyntaxKind.ConditionalExpression,
      flags: NodeFlags.None,
      condition,
      whenTrue,
      whenFalse,
    },
    tsOriginal
  )
}

export type Expression =
  | NilLiteral
  | BooleanLiteral
  | DotsLiteral
  | ArgLiteral
  | NumericLiteral
  | StringLiteral
  | FunctionExpression
  | TableFieldExpression
  | TableExpression
  | UnaryExpression
  | BinaryExpression
  | CallExpression
  | MethodCallExpression
  | Identifier
  | TableIndexExpression
  | ParenthesizedExpression
  | ConditionalExpression

declare module "./LuaAST-core" {
  interface NodeKindMap {
    [SyntaxKind.NilKeyword]: NilLiteral
    [SyntaxKind.TrueKeyword]: BooleanLiteral
    [SyntaxKind.FalseKeyword]: BooleanLiteral
    [SyntaxKind.DotsKeyword]: DotsLiteral
    [SyntaxKind.ArgKeyword]: ArgLiteral
    [SyntaxKind.NumericLiteral]: NumericLiteral
    [SyntaxKind.StringLiteral]: StringLiteral
    [SyntaxKind.FunctionExpression]: FunctionExpression
    [SyntaxKind.TableFieldExpression]: TableFieldExpression
    [SyntaxKind.TableExpression]: TableExpression
    [SyntaxKind.UnaryExpression]: UnaryExpression
    [SyntaxKind.BinaryExpression]: BinaryExpression
    [SyntaxKind.CallExpression]: CallExpression
    [SyntaxKind.MethodCallExpression]: MethodCallExpression
    [SyntaxKind.Identifier]: Identifier
    [SyntaxKind.TableIndexExpression]: TableIndexExpression
    [SyntaxKind.ParenthesizedExpression]: ParenthesizedExpression
    [SyntaxKind.ConditionalExpression]: ConditionalExpression
  }
}
