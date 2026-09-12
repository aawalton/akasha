import type { Rule } from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.code.ts"
import type {
  Given,
  Kind,
  Readers,
  Typing,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import type { Naming } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { bodyOf, type Held } from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"
import { type Shadow, shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const PROBE_AT = "akasha/one/probe.module.code.ts"

export const CHANGE_FROM = "../pages-system/change/change.module.code.ts"

export const JUDGED_FROM = "../checks-system/judging/judging.module.code.ts"

export const SHADOW_AT = "akasha/pages-system/shadow/shadow.module.code.ts"

export const RULE = "syntax-rule"

const MODULE = "module"

const COMMAND = "command"

const NAMESPACE = "namespace"

export const TEXT = "export const one = 1\n"

export const PROBE_SLUG = "probe"

const PROBE_RULE_AT = "akasha/one/probe/probe.syntax-rule.ts"

const PROBE_CODE_AT = "akasha/one/probe/probe.syntax-rule.code.ts"

export const JUDGED_AT = "akasha/one/judged.module.code.ts"

export const CARRIED =
  'export function probe() {\n  return [{ line: 1, reason: "the body the change carries" }]\n}\n'

export const BEFORE =
  'export function probe() {\n  return [{ line: 9, reason: "the body that was there" }]\n}\n'

export const UNPARSED = 'export function probe() {\n  return [{ line: 1, reason: "recovered"\n}\n'

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
  ["page-value", new Set(["valueAt"])],
  ["claude-account-reading", new Set(["accountValuesIn"])],
])

const MODULE_PAGES: readonly (readonly [string, Held])[] = [
  [
    "akasha/pages/value/page-value.module.ts",
    {
      id: "01a0596b-0000-7000-8000-000000000002",
      pageTypeSlug: MODULE,
      slug: "page-value",
      pageBodyReaders: ["valueAt"],
    },
  ],
  [
    "akasha/agents/claude-accounts/modules/reading/claude-account-reading.module.ts",
    {
      id: "01a0596b-0000-7000-8000-000000000003",
      pageTypeSlug: MODULE,
      slug: "claude-account-reading",
      pageBodyReaders: ["accountValuesIn"],
    },
  ],
  [
    "akasha/one/quiet.module.ts",
    {
      id: "01a0596b-0000-7000-8000-000000000004",
      pageTypeSlug: MODULE,
      slug: "quiet",
    },
  ],
]

export function modulesFiled(root: string): undefined {
  for (const [path, value] of MODULE_PAGES) {
    writing(root, path, bodyOf(value))
    listedFiled(root, MODULE, String(value.slug), [{ path, id: String(value.id) }])
  }
  return undefined
}

const LEVEL_PAGES: readonly (readonly [string, Held])[] = [
  [
    "akasha/commands/pages/change/change.namespace.ts",
    {
      id: "01a0596b-0000-7000-8000-000000000005",
      pageTypeSlug: NAMESPACE,
      slug: "change",
      name: "change",
    },
  ],
  [
    "akasha/commands/pages/change/draft/change-draft.command.ts",
    {
      id: "01a0596b-0000-7000-8000-000000000006",
      pageTypeSlug: COMMAND,
      slug: "change-draft",
      name: "draft",
    },
  ],
]

export function levelsFiled(root: string): undefined {
  for (const [path, value] of LEVEL_PAGES) {
    writing(root, path, bodyOf(value))
    listedFiled(root, String(value.pageTypeSlug), String(value.slug), [
      { path, id: String(value.id) },
    ])
  }
  return undefined
}

const NAMED: ReadonlyMap<string, string> = new Map([
  ["change", "change"],
  ["change-draft", "draft"],
  ["work-tree", "work-tree"],
  ["temper", "temper"],
  ["temper-addon", "addon"],
  ["temper-addon-data-generate", "data-generate"],
])

export const LEVELS_NAMED: Naming = (slug) => NAMED.get(slug) ?? null

const TYPED: ReadonlyMap<string, Kind> = new Map([
  ["change", NAMESPACE],
  ["change-draft", COMMAND],
  ["work-tree", COMMAND],
  ["temper", NAMESPACE],
  ["temper-addon", NAMESPACE],
  ["temper-addon-data-generate", COMMAND],
])

export const LEVELS_TYPED: Typing = (slug) => TYPED.get(slug) ?? null

export function parsed(text: string, at: string = PROBE_AT): Given {
  return {
    path: at,
    source: parsedAs(at, text),
    readers: READERS_FILED,
    namedAt: LEVELS_NAMED,
    typedAt: LEVELS_TYPED,
  }
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
