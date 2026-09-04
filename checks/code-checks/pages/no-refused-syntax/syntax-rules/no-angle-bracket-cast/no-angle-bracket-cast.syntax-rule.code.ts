import { lineOf } from "@akasha/code-system/code-source"
import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const SPELLED =
  "so one assertion is spelled two ways across the tree, and this is the way the same characters turn into a tag wherever the file is read as `.tsx`"

export function noAngleBracketCast(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isTypeAssertionExpression(node)) {
      found.push({
        line: lineOf(standing.source, node),
        reason: `this assertion is written as \`<Type>value\`, ${SPELLED}; write it with \`as\``,
      })
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
