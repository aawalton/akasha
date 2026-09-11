import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/code-source/code-source.module.code.ts"
import ts from "typescript"

const UNWEIGHED =
  "so a value the types say may be absent is taken as present, weighed against nothing, and the absence arrives as a crash rather than as an answer"

export function noNonNullAssertion(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isNonNullExpression(node)) {
      found.push({
        line: lineOf(standing.source, node),
        reason: `this asserts an absence away with \`!\`, ${UNWEIGHED}`,
      })
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
