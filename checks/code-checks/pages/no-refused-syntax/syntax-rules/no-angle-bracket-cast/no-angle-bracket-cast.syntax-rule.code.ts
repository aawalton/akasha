import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const SPELLED =
  "so one assertion is spelled two ways across the tree, and this is the way the same characters turn into a tag wherever the file is read as `.tsx`"

export function noAngleBracketCast(standing: Given): readonly Refusal[] {
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
