import { basenameOf } from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"
import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/code-source/code-source.module.code.ts"
import ts from "typescript"

const OPENS = "dlopen"

const FAMILY: readonly string[] = [
  "libc.",
  "libc-",
  "libm.so",
  "libdl.so",
  "libpthread.so",
  "librt.so",
  "libutil.so",
  "ld-musl-",
  "ld-linux",
]

const INSTEAD = "bind the object already mapped into the process instead"

export function isFamily(spec: string): boolean {
  const base = basenameOf(spec)
  return FAMILY.some((one) => base.startsWith(one))
}

function opensBy(node: ts.CallExpression): boolean {
  const called = node.expression
  if (ts.isIdentifier(called)) return called.text === OPENS
  return ts.isPropertyAccessExpression(called) && called.name.text === OPENS
}

function namedIn(node: ts.CallExpression): string | null {
  const first = node.arguments[0]
  if (first === undefined) return null
  if (ts.isStringLiteral(first)) return first.text
  return ts.isNoSubstitutionTemplateLiteral(first) ? first.text : null
}

export function noLibcByName(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node) && opensBy(node)) {
      const said = namedIn(node)
      if (said !== null && isFamily(said)) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `\`${said}\` is opened by name, so a second may be bound beside the one the process holds — ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
