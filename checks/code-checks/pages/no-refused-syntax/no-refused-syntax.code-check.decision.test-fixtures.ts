import type { Rule } from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.code.ts"
import type {
  Given,
  Readers,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { type Shadow, shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const PROBE_AT = "akasha/one/probe.module.code.ts"

export const CHANGE_FROM = "../pages-system/change/change.module.code.ts"

export const JUDGED_FROM = "../checks-system/judging/judging.module.code.ts"

export const RULE = "syntax-rule"

const MODULE = "module"

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

export const NO_READERS: Readers = new Map()

export const READERS_FILED: Readers = new Map([
  ["valueAt", new Set(["page-value"])],
  ["accountValuesIn", new Set(["claude-account-reading"])],
])

export function modulesFiled(root: string): undefined {
  valueAlsoFiled(root, MODULE, [
    {
      path: "akasha/pages/value/page-value.module.ts",
      value: {
        id: "01a0596b-0000-7000-8000-000000000002",
        pageTypeSlug: MODULE,
        slug: "page-value",
        pageBodyReaders: ["valueAt"],
      },
    },
    {
      path: "akasha/agents/claude-accounts/modules/reading/claude-account-reading.module.ts",
      value: {
        id: "01a0596b-0000-7000-8000-000000000003",
        pageTypeSlug: MODULE,
        slug: "claude-account-reading",
        pageBodyReaders: ["accountValuesIn"],
      },
    },
    {
      path: "akasha/one/quiet.module.ts",
      value: {
        id: "01a0596b-0000-7000-8000-000000000004",
        pageTypeSlug: MODULE,
        slug: "quiet",
      },
    },
  ])
  return undefined
}

export function parsed(text: string): Given {
  return { path: PROBE_AT, source: parsedAs(PROBE_AT, text), readers: READERS_FILED }
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
