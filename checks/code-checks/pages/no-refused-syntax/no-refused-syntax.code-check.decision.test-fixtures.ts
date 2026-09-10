import { parsedAs } from "@akasha/code/code-source"
import { listedFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { type Shadow, shadowAt } from "@akasha/pages/shadow"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Rule } from "./no-refused-syntax.code-check.decision.code.ts"
import type { Given } from "./syntax-rules/syntax-rule.page-type.ts"

export const PROBE_AT = "akasha/one/probe.module.code.ts"

export const RULE = "syntax-rule"

export const TEXT = "export const one = 1\n"

export const PROBE_SLUG = "probe"

export const PROBE_RULE_AT = "akasha/one/probe/probe.syntax-rule.ts"

export const PROBE_CODE_AT = "akasha/one/probe/probe.syntax-rule.code.ts"

export const JUDGED_AT = "akasha/one/judged.module.code.ts"

export const CARRIED =
  'export function probe() {\n  return [{ line: 1, reason: "the body the change carries" }]\n}\n'

export const BEFORE =
  'export function probe() {\n  return [{ line: 9, reason: "the body that was there" }]\n}\n'

export const QUIET: Rule = { slug: "quiet", judge: () => [] }

export const scratch = scratchWorld()

const PROBE_ID = "01a0596b-0000-7000-8000-000000000001"

const ON_DISK = `export function probe(given: { readonly path: string }) {
  if (given.path !== "${JUDGED_AT}") return []
  return [{ line: 1, reason: "the rule that sits on disk" }]
}
`

function bytesOf(text: string | null): Uint8Array | null {
  return text === null ? null : new TextEncoder().encode(text)
}

export function changing(root: string, before: string | null, after: string | null): Change {
  return {
    root,
    changed: [PROBE_CODE_AT],
    before: (path) => (path === PROBE_CODE_AT ? bytesOf(before) : null),
    after: (path) => (path === PROBE_CODE_AT ? bytesOf(after) : null),
  }
}

export function ruleFiled(root: string): undefined {
  listedFiled(root, RULE, PROBE_SLUG, [{ path: PROBE_RULE_AT, id: PROBE_ID }])
  valueAlsoFiled(root, RULE, [
    { path: PROBE_RULE_AT, value: { id: PROBE_ID, pageTypeSlug: RULE, slug: PROBE_SLUG } },
  ])
  return undefined
}

export function nowhereOnDisk(root: string): Shadow {
  const shadow = shadowAt(root)
  return { ...shadow, codeAt: () => null }
}

export function ruling(slug: string, line: number, reason: string): Rule {
  return { slug, judge: () => [{ line, reason }] }
}

export function parsed(text: string): Given {
  return { path: PROBE_AT, source: parsedAs(PROBE_AT, text) }
}

export function ruled(prefix: string): string {
  const root = scratch.rootFor(prefix)
  ruleFiled(root)
  writing(root, PROBE_CODE_AT, ON_DISK)
  return root
}

export function tracked(): string {
  const root = ruled("akasha-syntax-rule-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
