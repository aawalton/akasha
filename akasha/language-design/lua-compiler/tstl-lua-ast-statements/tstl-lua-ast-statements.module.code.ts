import type * as ts from "typescript"
import {
  type Node,
  NodeFlags,
  SyntaxKind,
  setNodePositionFromTs,
} from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import type {
  AssignmentLeftHandSideExpression,
  Expression,
  Identifier,
} from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { castArray } from "../tstl-utils/tstl-utils.module.code.ts"

export interface File extends Node {
  kind: typeof SyntaxKind.File
  statements: readonly Statement[]
  luaLibFeatures: Set<LuaLibFeature>
  trivia: string
}

export function isFile(node: Node): node is File {
  return node.kind === SyntaxKind.File
}

export function createFile(
  statements: readonly Statement[],
  luaLibFeatures: Set<LuaLibFeature>,
  trivia: string,
  tsOriginal?: ts.Node
): File {
  return setNodePositionFromTs(
    { kind: SyntaxKind.File, flags: NodeFlags.None, statements, luaLibFeatures, trivia },
    tsOriginal
  )
}

export interface Block extends Node {
  kind: typeof SyntaxKind.Block
  statements: readonly Statement[]
}

export function isBlock(node: Node): node is Block {
  return node.kind === SyntaxKind.Block
}

export function createBlock(statements: readonly Statement[], tsOriginal?: ts.Node): Block {
  return setNodePositionFromTs(
    { kind: SyntaxKind.Block, flags: NodeFlags.None, statements },
    tsOriginal
  )
}

interface StatementBase extends Node {
  leadingComments?: ReadonlyArray<string | readonly string[]>
  trailingComments?: ReadonlyArray<string | readonly string[]>
}

export interface DoStatement extends StatementBase {
  kind: typeof SyntaxKind.DoStatement
  statements: readonly Statement[]
}

export function isDoStatement(node: Node): node is DoStatement {
  return node.kind === SyntaxKind.DoStatement
}

export function createDoStatement(
  statements: readonly Statement[],
  tsOriginal?: ts.Node
): DoStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.DoStatement, flags: NodeFlags.None, statements },
    tsOriginal
  )
}

export interface VariableDeclarationStatement extends StatementBase {
  kind: typeof SyntaxKind.VariableDeclarationStatement
  left: readonly Identifier[]
  right?: readonly Expression[]
}

export function isVariableDeclarationStatement(node: Node): node is VariableDeclarationStatement {
  return node.kind === SyntaxKind.VariableDeclarationStatement
}

export function createVariableDeclarationStatement(
  left: Identifier | readonly Identifier[],
  right?: Expression | readonly Expression[],
  tsOriginal?: ts.Node
): VariableDeclarationStatement {
  return setNodePositionFromTs(
    {
      kind: SyntaxKind.VariableDeclarationStatement,
      flags: NodeFlags.None,
      left: castArray(left),
      right: right ? castArray(right) : undefined,
    },
    tsOriginal
  )
}

export interface AssignmentStatement extends StatementBase {
  kind: typeof SyntaxKind.AssignmentStatement
  left: readonly AssignmentLeftHandSideExpression[]
  right: readonly Expression[]
}

export function isAssignmentStatement(node: Node): node is AssignmentStatement {
  return node.kind === SyntaxKind.AssignmentStatement
}

export function createAssignmentStatement(
  left: AssignmentLeftHandSideExpression | readonly AssignmentLeftHandSideExpression[],
  right?: Expression | readonly Expression[],
  tsOriginal?: ts.Node
): AssignmentStatement {
  return setNodePositionFromTs(
    {
      kind: SyntaxKind.AssignmentStatement,
      flags: NodeFlags.None,
      left: castArray(left),
      right: right ? castArray(right) : [],
    },
    tsOriginal
  )
}

export interface IfStatement extends StatementBase {
  kind: typeof SyntaxKind.IfStatement
  condition: Expression
  ifBlock: Block
  elseBlock?: Block | IfStatement
}

export function isIfStatement(node: Node): node is IfStatement {
  return node.kind === SyntaxKind.IfStatement
}

export function createIfStatement(
  condition: Expression,
  ifBlock: Block,
  elseBlock?: Block | IfStatement,
  tsOriginal?: ts.Node
): IfStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.IfStatement, flags: NodeFlags.None, condition, ifBlock, elseBlock },
    tsOriginal
  )
}

export interface IterationStatement extends StatementBase {
  body: Block
}

export function isIterationStatement(node: Node): node is IterationStatement {
  return (
    node.kind === SyntaxKind.WhileStatement ||
    node.kind === SyntaxKind.RepeatStatement ||
    node.kind === SyntaxKind.ForStatement ||
    node.kind === SyntaxKind.ForInStatement
  )
}

export interface WhileStatement extends IterationStatement {
  kind: typeof SyntaxKind.WhileStatement
  condition: Expression
}

export function isWhileStatement(node: Node): node is WhileStatement {
  return node.kind === SyntaxKind.WhileStatement
}

export function createWhileStatement(
  body: Block,
  condition: Expression,
  tsOriginal?: ts.Node
): WhileStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.WhileStatement, flags: NodeFlags.None, body, condition },
    tsOriginal
  )
}

export interface RepeatStatement extends IterationStatement {
  kind: typeof SyntaxKind.RepeatStatement
  condition: Expression
}

export function isRepeatStatement(node: Node): node is RepeatStatement {
  return node.kind === SyntaxKind.RepeatStatement
}

export function createRepeatStatement(
  body: Block,
  condition: Expression,
  tsOriginal?: ts.Node
): RepeatStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.RepeatStatement, flags: NodeFlags.None, body, condition },
    tsOriginal
  )
}

export interface ForStatement extends IterationStatement {
  kind: typeof SyntaxKind.ForStatement
  controlVariable: Identifier
  controlVariableInitializer: Expression
  limitExpression: Expression
  stepExpression?: Expression
}

export function isForStatement(node: Node): node is ForStatement {
  return node.kind === SyntaxKind.ForStatement
}

export function createForStatement(
  body: Block,
  controlVariable: Identifier,
  controlVariableInitializer: Expression,
  limitExpression: Expression,
  stepExpression?: Expression,
  tsOriginal?: ts.Node
): ForStatement {
  return setNodePositionFromTs(
    {
      kind: SyntaxKind.ForStatement,
      flags: NodeFlags.None,
      body,
      controlVariable,
      controlVariableInitializer,
      limitExpression,
      stepExpression,
    },
    tsOriginal
  )
}

export interface ForInStatement extends IterationStatement {
  kind: typeof SyntaxKind.ForInStatement
  names: readonly Identifier[]
  expressions: readonly Expression[]
}

export function isForInStatement(node: Node): node is ForInStatement {
  return node.kind === SyntaxKind.ForInStatement
}

export function createForInStatement(
  body: Block,
  names: readonly Identifier[],
  expressions: readonly Expression[],
  tsOriginal?: ts.Node
): ForInStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.ForInStatement, flags: NodeFlags.None, body, names, expressions },
    tsOriginal
  )
}

export interface GotoStatement extends StatementBase {
  kind: typeof SyntaxKind.GotoStatement
  label: string
}

export function isGotoStatement(node: Node): node is GotoStatement {
  return node.kind === SyntaxKind.GotoStatement
}

export function createGotoStatement(label: string, tsOriginal?: ts.Node): GotoStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.GotoStatement, flags: NodeFlags.None, label },
    tsOriginal
  )
}

export interface LabelStatement extends StatementBase {
  kind: typeof SyntaxKind.LabelStatement
  name: string
}

export function isLabelStatement(node: Node): node is LabelStatement {
  return node.kind === SyntaxKind.LabelStatement
}

export function createLabelStatement(name: string, tsOriginal?: ts.Node): LabelStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.LabelStatement, flags: NodeFlags.None, name },
    tsOriginal
  )
}

export interface ReturnStatement extends StatementBase {
  kind: typeof SyntaxKind.ReturnStatement
  expressions: readonly Expression[]
}

export function isReturnStatement(node: Node): node is ReturnStatement {
  return node.kind === SyntaxKind.ReturnStatement
}

export function createReturnStatement(
  expressions: readonly Expression[],
  tsOriginal?: ts.Node
): ReturnStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.ReturnStatement, flags: NodeFlags.None, expressions },
    tsOriginal
  )
}

export interface BreakStatement extends StatementBase {
  kind: typeof SyntaxKind.BreakStatement
}

export function isBreakStatement(node: Node): node is BreakStatement {
  return node.kind === SyntaxKind.BreakStatement
}

export function createBreakStatement(tsOriginal?: ts.Node): BreakStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.BreakStatement, flags: NodeFlags.None },
    tsOriginal
  )
}

export interface ContinueStatement extends StatementBase {
  kind: typeof SyntaxKind.ContinueStatement
}

export function isContinueStatement(node: Node): node is ContinueStatement {
  return node.kind === SyntaxKind.ContinueStatement
}

export function createContinueStatement(tsOriginal?: ts.Node): ContinueStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.ContinueStatement, flags: NodeFlags.None },
    tsOriginal
  )
}

export interface ExpressionStatement extends StatementBase {
  kind: typeof SyntaxKind.ExpressionStatement
  expression: Expression
}

export function isExpressionStatement(node: Node): node is ExpressionStatement {
  return node.kind === SyntaxKind.ExpressionStatement
}

export function createExpressionStatement(
  expressions: Expression,
  tsOriginal?: ts.Node
): ExpressionStatement {
  return setNodePositionFromTs(
    { kind: SyntaxKind.ExpressionStatement, flags: NodeFlags.None, expression: expressions },
    tsOriginal
  )
}

export type Statement =
  | DoStatement
  | VariableDeclarationStatement
  | AssignmentStatement
  | IfStatement
  | WhileStatement
  | RepeatStatement
  | ForStatement
  | ForInStatement
  | GotoStatement
  | LabelStatement
  | ReturnStatement
  | BreakStatement
  | ContinueStatement
  | ExpressionStatement

declare module "./LuaAST-core" {
  interface NodeKindMap {
    [SyntaxKind.File]: File
    [SyntaxKind.Block]: Block
    [SyntaxKind.DoStatement]: DoStatement
    [SyntaxKind.VariableDeclarationStatement]: VariableDeclarationStatement
    [SyntaxKind.AssignmentStatement]: AssignmentStatement
    [SyntaxKind.IfStatement]: IfStatement
    [SyntaxKind.WhileStatement]: WhileStatement
    [SyntaxKind.RepeatStatement]: RepeatStatement
    [SyntaxKind.ForStatement]: ForStatement
    [SyntaxKind.ForInStatement]: ForInStatement
    [SyntaxKind.GotoStatement]: GotoStatement
    [SyntaxKind.LabelStatement]: LabelStatement
    [SyntaxKind.ReturnStatement]: ReturnStatement
    [SyntaxKind.BreakStatement]: BreakStatement
    [SyntaxKind.ContinueStatement]: ContinueStatement
    [SyntaxKind.ExpressionStatement]: ExpressionStatement
  }
}
