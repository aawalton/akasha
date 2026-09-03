
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { valueAt, type Value } from "@akasha/pages-system/page-value"
import { AKASHA } from "./files.ts"
import { ruleFromMatches, statedMatches } from "./rule-clauses.ts"
import { categoryTitles } from "./rule-pages.ts"
import type { Match, Outcome, Rule } from "./rules.ts"

/**
 * The rules stand as TypeScript pages inside akasha, one file to a rule, since the markdown rule
 * set was migrated away. This reads the checkout directly rather than asking the pages system
 * service for them: the categorization ring runs under a workstation timer, where no service
 * stands, so a rule that could only be read over HTTP could not be read at all.
 */
const RULES = "akasha/alan/harness/monarch/category-rules"

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
    folder: `${RULES}/category-rule-agents/pages`,
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

async function namesIn(one: Kind): Promise<readonly string[]> {
  let entries: readonly string[]
  try {
    entries = await readdir(join(AKASHA, one.folder))
  } catch (why) {
    throw new Error(
      `no folder stands at ${one.folder}, so this reader cannot say whether the ${one.kind} ` +
        "rules are gone or merely moved. Answering with no rules would categorize nothing and " +
        `report nothing wrong. (${why instanceof Error ? why.message : String(why)})`
    )
  }
  const names = entries.filter((name) => name.endsWith(`.${one.type}.ts`)).sort()
  if (names.length === 0) {
    throw new Error(
      `${one.folder} holds no \`.${one.type}.ts\` page. A rule folder that has emptied is a ` +
        "migration half-done rather than a project with no rules, so nothing is read from here."
    )
  }
  return names
}

function textOf(page: RulePage, name: string): string | null {
  const held = page.value[name]
  if (held === undefined || held === null) return null
  if (typeof held !== "string") throw new Error(`${page.path}: \`${name}\` is no single word`)
  return held
}

function countOf(page: RulePage, name: string): number | null {
  const held = page.value[name]
  if (held === undefined || held === null) return null
  if (typeof held !== "number") throw new Error(`${page.path}: \`${name}\` is no number`)
  return held
}

async function standing(): Promise<readonly RulePage[]> {
  const found: RulePage[] = []
  const held = new Map<string, string>()
  for (const one of KINDS) {
    for (const name of await namesIn(one)) {
      const path = `${one.folder}/${name}`
      const value = valueAt(path, AKASHA)
      if (value === null) {
        throw new Error(`${path}: this page's body will not load, so what it states is unknown`)
      }
      const slug = value["slug"]
      if (typeof slug !== "string" || slug.trim() === "") {
        throw new Error(`${path}: no \`slug\`, so nothing names this rule`)
      }
      const already = held.get(slug)
      if (already !== undefined) {
        throw new Error(
          `\`${slug}\` stands at ${already} and at ${path}, so nothing says which carries it`
        )
      }
      held.set(slug, path)
      found.push({ kind: one.kind, slug, path, value })
    }
  }
  return found
}

/**
 * What a rule decides. A page naming a category decides that category; a page naming none catches
 * the transaction and leaves it to a person, which is the page type's own departure.
 */
function outcomeOf(page: RulePage, categories: ReadonlyMap<string, string>): Outcome {
  const slug = textOf(page, "categorySlug")
  if (slug === null) return { kind: "reserve" }
  if (!categories.has(slug)) {
    throw new Error(
      `${page.path}: no category stands at \`${slug}\`. It may have been merged or renamed ` +
        "in Monarch."
    )
  }
  return { kind: "categorize", category: slug }
}

export async function loadCategoryRules(): Promise<RuleSet> {
  const categories = await categoryTitles()

  const rules: Rule[] = []
  const agentRules: AgentRule[] = []

  for (const page of await standing()) {
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
          categorySlug: textOf(page, "categorySlug"),
          ruleNote: textOf(page, "ruleNote"),
          counterpartWithinDays: countOf(page, "counterpartWithinDays"),
        },
        outcomeOf(page, categories)
      )
    )
  }
  return { rules, agentRules }
}
