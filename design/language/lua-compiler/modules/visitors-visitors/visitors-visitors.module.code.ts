import type {
  FunctionVisitor,
  Visitors,
} from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import {
  transformElementAccessExpression,
  transformPropertyAccessExpression,
  transformQualifiedName,
} from "akasha/design/language/lua-compiler/modules/visit-access/visit-access.module.code.ts"
import { transformAwaitExpression } from "akasha/design/language/lua-compiler/modules/visit-async-await/visit-async-await.module.code.ts"
import { transformBlock } from "akasha/design/language/lua-compiler/modules/visit-block/visit-block.module.code.ts"
import {
  transformBreakStatement,
  transformContinueStatement,
} from "akasha/design/language/lua-compiler/modules/visit-break-continue/visit-break-continue.module.code.ts"
import { transformCallExpression } from "akasha/design/language/lua-compiler/modules/visit-call/visit-call.module.code.ts"
import {
  transformConditionalExpression,
  transformIfStatement,
} from "akasha/design/language/lua-compiler/modules/visit-conditional/visit-conditional.module.code.ts"
import { transformDeleteExpression } from "akasha/design/language/lua-compiler/modules/visit-delete/visit-delete.module.code.ts"
import {
  transformDoStatement,
  transformWhileStatement,
} from "akasha/design/language/lua-compiler/modules/visit-do-while/visit-do-while.module.code.ts"
import { transformEnumDeclaration } from "akasha/design/language/lua-compiler/modules/visit-enum/visit-enum.module.code.ts"
import {
  transformThrowStatement,
  transformTryStatement,
} from "akasha/design/language/lua-compiler/modules/visit-errors/visit-errors.module.code.ts"
import {
  transformExportAssignment,
  transformExportDeclaration,
} from "akasha/design/language/lua-compiler/modules/visit-export/visit-export.module.code.ts"
import { transformExpressionStatement } from "akasha/design/language/lua-compiler/modules/visit-expression-statement/visit-expression-statement.module.code.ts"
import { transformForStatement } from "akasha/design/language/lua-compiler/modules/visit-for/visit-for.module.code.ts"
import { transformForInStatement } from "akasha/design/language/lua-compiler/modules/visit-for-in/visit-for-in.module.code.ts"
import { transformForOfStatement } from "akasha/design/language/lua-compiler/modules/visit-for-of/visit-for-of.module.code.ts"
import {
  transformFunctionDeclaration,
  transformFunctionLikeDeclaration,
  transformYieldExpression,
} from "akasha/design/language/lua-compiler/modules/visit-function/visit-function.module.code.ts"
import { transformIdentifierExpression } from "akasha/design/language/lua-compiler/modules/visit-identifier/visit-identifier.module.code.ts"
import {
  transformExternalModuleReference,
  transformImportDeclaration,
  transformImportEqualsDeclaration,
} from "akasha/design/language/lua-compiler/modules/visit-import/visit-import.module.code.ts"
import { LITERAL_VISITORS } from "akasha/design/language/lua-compiler/modules/visit-literal/visit-literal.module.code.ts"
import { transformModuleDeclaration } from "akasha/design/language/lua-compiler/modules/visit-namespace/visit-namespace.module.code.ts"
import { transformNewExpression } from "akasha/design/language/lua-compiler/modules/visit-new/visit-new.module.code.ts"
import { transformReturnStatement } from "akasha/design/language/lua-compiler/modules/visit-return/visit-return.module.code.ts"
import { transformSourceFileNode } from "akasha/design/language/lua-compiler/modules/visit-source-file/visit-source-file.module.code.ts"
import { transformSpreadElement } from "akasha/design/language/lua-compiler/modules/visit-spread/visit-spread.module.code.ts"
import { transformSwitchStatement } from "akasha/design/language/lua-compiler/modules/visit-switch/visit-switch.module.code.ts"
import {
  transformTaggedTemplateExpression,
  transformTemplateExpression,
} from "akasha/design/language/lua-compiler/modules/visit-template/visit-template.module.code.ts"
import { transformTypeOfExpression } from "akasha/design/language/lua-compiler/modules/visit-typeof/visit-typeof.module.code.ts"
import { TYPESCRIPT_VISITORS } from "akasha/design/language/lua-compiler/modules/visit-typescript/visit-typescript.module.code.ts"
import {
  transformPostfixUnaryExpression,
  transformPrefixUnaryExpression,
} from "akasha/design/language/lua-compiler/modules/visit-unary-expression/visit-unary-expression.module.code.ts"
import { transformVariableStatement } from "akasha/design/language/lua-compiler/modules/visit-variable-declaration/visit-variable-declaration.module.code.ts"
import { transformVoidExpression } from "akasha/design/language/lua-compiler/modules/visit-void/visit-void.module.code.ts"
import { transformBinaryExpression } from "akasha/design/language/lua-compiler/modules/visitors-binary-expression/visitors-binary-expression.module.code.ts"
import {
  transformClassAsExpression,
  transformClassDeclaration,
  transformSuperExpression,
  transformThisExpression,
} from "akasha/design/language/lua-compiler/modules/visitors-class/visitors-class.module.code.ts"
import * as ts from "typescript"

const transformEmptyStatement: FunctionVisitor<ts.EmptyStatement> = () => undefined
const transformParenthesizedExpression: FunctionVisitor<ts.ParenthesizedExpression> = (
  node,
  context
) => context.transformExpression(node.expression)

export const STANDARD_VISITORS: Visitors = {
  ...LITERAL_VISITORS,
  ...TYPESCRIPT_VISITORS,
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
