import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const DROPPED =
  "so a body handing back a value fills it and that value is dropped without a word — an async body's promise above all"

export function noVoidReturn(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isFunctionLike(node) && node.type?.kind === ts.SyntaxKind.VoidKeyword) {
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
