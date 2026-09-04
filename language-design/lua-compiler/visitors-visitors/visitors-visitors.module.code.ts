import * as ts from "typescript"
import type { FunctionVisitor, Visitors } from "../context-visitors/context-visitors.module.code.ts"
import {
  transformElementAccessExpression,
  transformPropertyAccessExpression,
  transformQualifiedName,
} from "../visit-access/visit-access.module.code.ts"
import { transformAwaitExpression } from "../visit-async-await/visit-async-await.module.code.ts"
import { transformBlock } from "../visit-block/visit-block.module.code.ts"
import {
  transformBreakStatement,
  transformContinueStatement,
} from "../visit-break-continue/visit-break-continue.module.code.ts"
import { transformCallExpression } from "../visit-call/visit-call.module.code.ts"
import {
  transformConditionalExpression,
  transformIfStatement,
} from "../visit-conditional/visit-conditional.module.code.ts"
import { transformDeleteExpression } from "../visit-delete/visit-delete.module.code.ts"
import {
  transformDoStatement,
  transformWhileStatement,
} from "../visit-do-while/visit-do-while.module.code.ts"
import { transformEnumDeclaration } from "../visit-enum/visit-enum.module.code.ts"
import {
  transformThrowStatement,
  transformTryStatement,
} from "../visit-errors/visit-errors.module.code.ts"
import {
  transformExportAssignment,
  transformExportDeclaration,
} from "../visit-export/visit-export.module.code.ts"
import { transformExpressionStatement } from "../visit-expression-statement/visit-expression-statement.module.code.ts"
import { transformForStatement } from "../visit-for/visit-for.module.code.ts"
import { transformForInStatement } from "../visit-for-in/visit-for-in.module.code.ts"
import { transformForOfStatement } from "../visit-for-of/visit-for-of.module.code.ts"
import {
  transformFunctionDeclaration,
  transformFunctionLikeDeclaration,
  transformYieldExpression,
} from "../visit-function/visit-function.module.code.ts"
import { transformIdentifierExpression } from "../visit-identifier/visit-identifier.module.code.ts"
import {
  transformExternalModuleReference,
  transformImportDeclaration,
  transformImportEqualsDeclaration,
} from "../visit-import/visit-import.module.code.ts"
import { literalVisitors } from "../visit-literal/visit-literal.module.code.ts"
import { transformModuleDeclaration } from "../visit-namespace/visit-namespace.module.code.ts"
import { transformNewExpression } from "../visit-new/visit-new.module.code.ts"
import { transformReturnStatement } from "../visit-return/visit-return.module.code.ts"
import { transformSourceFileNode } from "../visit-source-file/visit-source-file.module.code.ts"
import { transformSpreadElement } from "../visit-spread/visit-spread.module.code.ts"
import { transformSwitchStatement } from "../visit-switch/visit-switch.module.code.ts"
import {
  transformTaggedTemplateExpression,
  transformTemplateExpression,
} from "../visit-template/visit-template.module.code.ts"
import { transformTypeOfExpression } from "../visit-typeof/visit-typeof.module.code.ts"
import { typescriptVisitors } from "../visit-typescript/visit-typescript.module.code.ts"
import {
  transformPostfixUnaryExpression,
  transformPrefixUnaryExpression,
} from "../visit-unary-expression/visit-unary-expression.module.code.ts"
import { transformVariableStatement } from "../visit-variable-declaration/visit-variable-declaration.module.code.ts"
import { transformVoidExpression } from "../visit-void/visit-void.module.code.ts"
import { transformBinaryExpression } from "../visitors-binary-expression/visitors-binary-expression.module.code.ts"
import {
  transformClassAsExpression,
  transformClassDeclaration,
  transformSuperExpression,
  transformThisExpression,
} from "../visitors-class/visitors-class.module.code.ts"

const transformEmptyStatement: FunctionVisitor<ts.EmptyStatement> = () => undefined
const transformParenthesizedExpression: FunctionVisitor<ts.ParenthesizedExpression> = (
  node,
  context
) => context.transformExpression(node.expression)

export const standardVisitors: Visitors = {
  ...literalVisitors,
  ...typescriptVisitors,
  [ts.SyntaxKind.ArrowFunction]: transformFunctionLikeDeclaration,
  [ts.SyntaxKind.AwaitExpression]: transformAwaitExpression,
  [ts.SyntaxKind.BinaryExpression]: transformBinaryExpression,
  [ts.SyntaxKind.Block]: transformBlock,
  [ts.SyntaxKind.BreakStatement]: transformBreakStatement,
  [ts.SyntaxKind.CallExpression]: transformCallExpression,
  [ts.SyntaxKind.ClassDeclaration]: transformClassDeclaration,
  [ts.SyntaxKind.ClassExpression]: transformClassAsExpression,
  [ts.SyntaxKind.ConditionalExpression]: transformConditionalExpression,
  [ts.SyntaxKind.ContinueStatement]: transformContinueStatement,
  [ts.SyntaxKind.DeleteExpression]: transformDeleteExpression,
  [ts.SyntaxKind.DoStatement]: transformDoStatement,
  [ts.SyntaxKind.ElementAccessExpression]: transformElementAccessExpression,
  [ts.SyntaxKind.EmptyStatement]: transformEmptyStatement,
  [ts.SyntaxKind.EnumDeclaration]: transformEnumDeclaration,
  [ts.SyntaxKind.ExportAssignment]: transformExportAssignment,
  [ts.SyntaxKind.ExportDeclaration]: transformExportDeclaration,
  [ts.SyntaxKind.ExpressionStatement]: transformExpressionStatement,
  [ts.SyntaxKind.ExternalModuleReference]: transformExternalModuleReference,
  [ts.SyntaxKind.ForInStatement]: transformForInStatement,
  [ts.SyntaxKind.ForOfStatement]: transformForOfStatement,
  [ts.SyntaxKind.ForStatement]: transformForStatement,
  [ts.SyntaxKind.FunctionDeclaration]: transformFunctionDeclaration,
  [ts.SyntaxKind.FunctionExpression]: transformFunctionLikeDeclaration,
  [ts.SyntaxKind.Identifier]: transformIdentifierExpression,
  [ts.SyntaxKind.IfStatement]: transformIfStatement,
  [ts.SyntaxKind.ImportDeclaration]: transformImportDeclaration,
  [ts.SyntaxKind.ImportEqualsDeclaration]: transformImportEqualsDeclaration,
  [ts.SyntaxKind.ModuleDeclaration]: transformModuleDeclaration,
  [ts.SyntaxKind.NewExpression]: transformNewExpression,
  [ts.SyntaxKind.ParenthesizedExpression]: transformParenthesizedExpression,
  [ts.SyntaxKind.PostfixUnaryExpression]: transformPostfixUnaryExpression,
  [ts.SyntaxKind.PrefixUnaryExpression]: transformPrefixUnaryExpression,
  [ts.SyntaxKind.PropertyAccessExpression]: transformPropertyAccessExpression,
  [ts.SyntaxKind.QualifiedName]: transformQualifiedName,
  [ts.SyntaxKind.ReturnStatement]: transformReturnStatement,
  [ts.SyntaxKind.SourceFile]: transformSourceFileNode,
  [ts.SyntaxKind.SpreadElement]: transformSpreadElement,
  [ts.SyntaxKind.SuperKeyword]: transformSuperExpression,
  [ts.SyntaxKind.SwitchStatement]: transformSwitchStatement,
  [ts.SyntaxKind.TaggedTemplateExpression]: transformTaggedTemplateExpression,
  [ts.SyntaxKind.TemplateExpression]: transformTemplateExpression,
  [ts.SyntaxKind.ThisKeyword]: transformThisExpression,
  [ts.SyntaxKind.ThrowStatement]: transformThrowStatement,
  [ts.SyntaxKind.TryStatement]: transformTryStatement,
  [ts.SyntaxKind.TypeOfExpression]: transformTypeOfExpression,
  [ts.SyntaxKind.VariableStatement]: transformVariableStatement,
  [ts.SyntaxKind.WhileStatement]: transformWhileStatement,
  [ts.SyntaxKind.YieldExpression]: transformYieldExpression,
  [ts.SyntaxKind.VoidExpression]: transformVoidExpression,
}
