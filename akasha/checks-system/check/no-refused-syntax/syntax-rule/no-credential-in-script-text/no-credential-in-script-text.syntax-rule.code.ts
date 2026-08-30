import ts from "typescript"
import { lineOf } from "../../../../../code-system/code-source/code-source.module.code.ts"
import type { Refusal, Standing } from "../syntax-rule.page-type.ts"

const SINKS: ReadonlySet<string> = new Set(["evaluate", "evaluateHandle", "waitForFunction"])

const CREDENTIAL = /password|passwd|pwd|secret|credential/i

const LEAKS =
  "so it is handed to the browser as source and stands in every log and trace that run leaves"

function sinkNamed(node: ts.CallExpression): string | null {
  const called = node.expression
  if (!ts.isPropertyAccessExpression(called)) return null
  return SINKS.has(called.name.text) ? called.name.text : null
}

export function credentialNamedIn(node: ts.Node): string | null {
  if (ts.isIdentifier(node) && CREDENTIAL.test(node.text)) return node.text
  return ts.forEachChild(node, credentialNamedIn) ?? null
}

export function noCredentialInScriptText(standing: Standing): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const sink = sinkNamed(node)
      const first = node.arguments[0]
      if (
        sink !== null &&
        first !== undefined &&
        !ts.isArrowFunction(first) &&
        !ts.isFunctionExpression(first)
      ) {
        const named = credentialNamedIn(first)
        if (named !== null) {
          found.push({
            line: lineOf(standing.source, node),
            reason: `\`${named}\` is named in the text handed to \`${sink}\`, ${LEAKS}`,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
