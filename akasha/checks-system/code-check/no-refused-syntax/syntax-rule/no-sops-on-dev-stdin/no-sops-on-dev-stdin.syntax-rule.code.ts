import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const PIPE = "/dev/stdin"

const MARKERS: ReadonlySet<string> = new Set(["sops", "--filename-override"])

const WHY =
  "sops opens and seeks what it is handed and a pipe answers neither — write the plaintext to a " +
  "real file and pass its path, with `--filename-override` so the creation rule still matches"

export function spelledIn(node: ts.Node): readonly string[] {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return [node.text]
  if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap((one) => spelledIn(one))
  return []
}

export function noSopsOnDevStdin(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const said = node.arguments.flatMap((one) => spelledIn(one))
      if (said.includes(PIPE) && said.some((one) => MARKERS.has(one))) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this call hands \`${PIPE}\` to sops — ${WHY}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
