import { AKASHA } from "akasha/alan/harness/monarch/modules/files/monarch-files.module.code.ts"
import {
  ruleFromMatches,
  statedMatches,
} from "akasha/alan/harness/monarch/modules/rule-clauses/monarch-rule-clauses.module.code.ts"
import { categoryTitles } from "akasha/alan/harness/monarch/modules/rule-pages/monarch-rule-pages.module.code.ts"
import type {
  Match,
  Outcome,
  Rule,
} from "akasha/alan/harness/monarch/modules/rules/monarch-rules.module.code.ts"
import { valuesByPath } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import {
  slugOf,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const RULES = "alan/harness/monarch/category-rules"

interface Kind {
  readonly kind: string
  readonly folder: string
  readonly type: string
}

const KINDS: readonly Kind[] = [
  {
    kind: "code",
    folder: `${RULES}/category-rule-codes/pages`,
    type: "category-rule-code",
  },
  {
    kind: "agent",
    folder: `${RULES}/category-rule-agent/pages`,
    type: "category-rule-agent",
  },
]

export function ruleFolder(): string {
  return KINDS.map((one) => one.folder)
    .sort()
    .join(" and ")
}

export interface AgentRule {
  readonly slug: string
  readonly title: string
  readonly matches: readonly Match[]
  readonly judgement: string
}

export interface RuleSet {
  readonly rules: readonly Rule[]
  readonly agentRules: readonly AgentRule[]
}

interface RulePage {
  readonly kind: string
  readonly slug: string
  readonly path: string
  readonly value: Value
}

function pagesIn(one: Kind): ReadonlyMap<string, Value> {
  const found = valuesByPath(AKASHA, one.type)
  if (found.size === 0) {
    throw new Error(
      `the index answers with no \`${one.type}\` page, so this reader cannot say whether the ` +
        `${one.kind} rules are gone or merely moved. A rule kind that has emptied is a migration ` +
        "half-done rather than a rule set meant to be empty, so nothing is read from here."
    )
  }
  return found
}

function textOf(page: RulePage, name: string): string | null {
  const held = page.value[name]
  if (held === undefined || held === null) return null
  if (typeof held !== "string") throw new Error(`${page.path}: \`${name}\` is no single word`)
  return held
}

function categoryOf(page: RulePage): string | null {
  const held = textOf(page, "category")
  return held === null ? null : slugOf(held)
}

function countOf(page: RulePage, name: string): number | null {
  const held = page.value[name]
  if (held === undefined || held === null) return null
  if (typeof held !== "number") throw new Error(`${page.path}: \`${name}\` is no number`)
  return held
}

function rulePages(): readonly RulePage[] {
  const found: RulePage[] = []
  const held = new Map<string, string>()
  for (const one of KINDS) {
    for (const [path, value] of pagesIn(one)) {
      const slug = value["slug"]
      if (typeof slug !== "string" || slug.trim() === "") {
        throw new Error(`${path}: no \`slug\`, so nothing names this rule`)
      }
      const already = held.get(slug)
      if (already !== undefined) {
        throw new Error(
          `\`${slug}\` exists at ${already} and at ${path}, so nothing says which carries it`
        )
      }
      held.set(slug, path)
      found.push({ kind: one.kind, slug, path, value })
    }
  }
  return found
}

function outcomeOf(page: RulePage, categories: ReadonlyMap<string, string>): Outcome {
  const slug = categoryOf(page)
  if (slug === null) return { kind: "reserve" }
  if (!categories.has(slug)) {
    throw new Error(
      `${page.path}: no category exists at \`${slug}\`. It may have been merged or renamed ` +
        "in Monarch."
    )
  }
  return { kind: "categorize", category: slug }
}

export async function loadCategoryRules(): Promise<RuleSet> {
  const categories = await categoryTitles()

  const rules: Rule[] = []
  const agentRules: AgentRule[] = []

  for (const page of rulePages()) {
    const matches = statedMatches(page.path, page.value["matches"])
    if (page.kind === "agent") {
      const judgement = textOf(page, "judgement")
      if (judgement === null || judgement.trim() === "") {
        throw new Error(
          `${page.path}: an agent rule carries the judgement a reader acts on, and this one ` +
            "carries none"
        )
      }
      if (matches.length === 0) {
        throw new Error(
          `${page.path}: this rule states no clause, so it would put every transaction there is ` +
            "in front of a reader"
        )
      }
      agentRules.push({
        slug: page.slug,
        title: textOf(page, "title") ?? page.slug,
        matches,
        judgement,
      })
      continue
    }
    rules.push(
      ruleFromMatches(
        page.path,
        {
          name: page.slug,
          matches,
          category: categoryOf(page),
          ruleNote: textOf(page, "ruleNote"),
          counterpartWithinDays: countOf(page, "counterpartWithinDays"),
        },
        outcomeOf(page, categories)
      )
    )
  }
  return { rules, agentRules }
}
