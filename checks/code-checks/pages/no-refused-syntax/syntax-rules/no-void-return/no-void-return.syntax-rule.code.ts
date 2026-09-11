import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const DROPPED =
  "so a body handing back a value fills it and that value is dropped without a word — an async body's promise above all"

const WRITTEN_HERE: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.GetAccessor,
])

function declared(node: ts.Node): boolean {
  if (!ts.canHaveModifiers(node)) return false
  return (ts.getModifiers(node) ?? []).some((one) => one.kind === ts.SyntaxKind.DeclareKeyword)
}

function ambient(node: ts.Node): boolean {
  if (ts.isSourceFile(node)) return node.isDeclarationFile
  return declared(node) || ambient(node.parent)
}

export function noVoidReturn(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isFunctionLike(node) &&
      WRITTEN_HERE.has(node.kind) &&
      !ambient(node) &&
      node.type?.kind === ts.SyntaxKind.VoidKeyword
    ) {
      found.push({
        line: lineOf(standing.source, node.type),
        reason: `this return type is \`void\`, ${DROPPED}; write \`undefined\``,
      })
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
