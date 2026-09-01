import { lineOf } from "@akasha/code-system/code-source"
import ts from "typescript"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const UNWEIGHED =
  "so a value the types say may be absent is taken as present, weighed against nothing, and the absence arrives as a crash rather than as an answer"

export function noNonNullAssertion(standing: Standing): readonly Refusal[] {
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
