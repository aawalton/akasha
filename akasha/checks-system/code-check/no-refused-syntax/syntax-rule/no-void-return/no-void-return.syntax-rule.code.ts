import { lineOf } from "@akasha/code-system/code-source"
import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const DROPPED =
  "so a body handing back a value fills it and that value is dropped without a word — an async body's promise above all"

const WRITTEN_HERE: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.GetAccessor,
])

export function noVoidReturn(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isFunctionLike(node) &&
      WRITTEN_HERE.has(node.kind) &&
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
