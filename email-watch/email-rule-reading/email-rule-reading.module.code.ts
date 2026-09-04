import { readdirSync } from "node:fs"
import { createRequire } from "node:module"
import {
  type EmailRuleKind,
  ruleFileSuffix,
  ruleFolderIn,
  ruleKinds,
} from "@akasha/email-watch/email-rule-set"
import type { Condition } from "@akasha/rules-engine/rule-conditions"

export type Action = "notify" | "unsubscribe"

export type Filing = "archive" | "skip"

export interface Rule {
  readonly slug: string
  readonly relPath: string
  readonly kind: string
  readonly filing: Filing | null
  readonly actions: readonly Action[]
  readonly forwardToSlug: string | null
  readonly delayMinutes: number
  readonly judgment: string
  readonly conditions: readonly Condition[]
}

const load = createRequire(import.meta.url)

interface Spelling {
  readonly test: string
  readonly negated: boolean
}

const SPELLINGS: Readonly<Record<string, Spelling>> = {
  is: { test: "is", negated: false },
  "is-not": { test: "is", negated: true },
  "starts-with": { test: "starts with", negated: false },
  "does-not-start-with": { test: "starts with", negated: true },
  "ends-with": { test: "ends with", negated: false },
  "does-not-end-with": { test: "ends with", negated: true },
  contains: { test: "contains", negated: false },
  "does-not-contain": { test: "contains", negated: true },
}

const DELAY = /^([0-9]+)([mh])$/

function delayOf(stated: unknown, relPath: string): number {
  if (stated === undefined || stated === null) return 0
  const found = typeof stated === "string" ? DELAY.exec(stated) : null
  if (found === null)
    throw new Error(
      `\`${relPath}\` states the delay \`${String(stated)}\`, which is no count of minutes or hours`
    )
  return Number(found[1]) * (found[2] === "h" ? 60 : 1)
}

export function pageOf(at: string): Record<string, unknown> {
  const declared = load(at) as Record<string, unknown>
  const values = Object.values(declared).filter(
    (one): one is Record<string, unknown> => typeof one === "object" && one !== null
  )
  const only = values[0]
  if (values.length !== 1 || only === undefined)
    throw new Error(`\`${at}\` declares ${values.length} page value(s) rather than one`)
  return only
}

function conditionsOf(page: Record<string, unknown>, relPath: string): readonly Condition[] {
  const stated = page.matches
  if (!Array.isArray(stated))
    throw new Error(`\`${relPath}\` states no \`matches\`, so nothing says which mail it claims`)
  if (stated.length === 0)
    throw new Error(`\`${relPath}\` holds no clause, and a rule holding none claims every message`)
  return stated.map((one: unknown) => {
    const clause = (one ?? {}) as Record<string, unknown>
    const field = clause.field
    const comparison = clause.comparison
    const values = clause.values
    if (typeof field !== "string" || typeof comparison !== "string" || !Array.isArray(values))
      throw new Error(`\`${relPath}\` holds a clause that is no field, comparison and values`)
    const spelling = SPELLINGS[comparison]
    if (spelling === undefined)
      throw new Error(`\`${relPath}\` compares by \`${comparison}\`, which no comparison spells`)
    return {
      field,
      test: spelling.test,
      negated: spelling.negated,
      values: values.map((value: unknown) => String(value)),
    }
  })
}

function textOr(stated: unknown, fallback: string): string {
  return typeof stated === "string" ? stated : fallback
}

function ruleOf(page: Record<string, unknown>, relPath: string, kind: EmailRuleKind): Rule {
  const slug = page.slug
  if (typeof slug !== "string")
    throw new Error(`\`${relPath}\` states no slug, so nothing names the rule`)
  const filing = page.filing
  if (filing !== undefined && filing !== "archive" && filing !== "skip")
    throw new Error(
      `\`${relPath}\` files by \`${String(filing)}\` rather than archiving or skipping`
    )
  const actions = page.actions
  if (actions !== undefined && !Array.isArray(actions))
    throw new Error(`\`${relPath}\` states actions that are no list`)
  const forwardToSlug = page.forwardToSlug
  if (forwardToSlug !== undefined && typeof forwardToSlug !== "string")
    throw new Error(`\`${relPath}\` forwards to something that is no slug`)
  return {
    slug,
    relPath,
    kind,
    filing: filing === undefined ? null : filing,
    actions: (actions ?? []).map((one: unknown) => String(one) as Action),
    forwardToSlug: forwardToSlug === undefined ? null : forwardToSlug,
    delayMinutes: delayOf(page.delay, relPath),
    judgment: textOr(page.judgement, ""),
    conditions: conditionsOf(page, relPath),
  }
}

export function rulesOf(person: string, root: string): readonly Rule[] {
  const rules: Rule[] = []
  for (const kind of ruleKinds()) {
    const folder = ruleFolderIn(person, kind)
    const suffix = ruleFileSuffix(kind)
    let held: readonly string[]
    try {
      held = readdirSync(`${root}/${folder}`)
    } catch (error) {
      throw new Error(
        `\`${folder}\` cannot be read, so what ${person}'s ${kind} rules say is unknown: ${String(error)}`
      )
    }
    const names = [...held].filter((one) => one.endsWith(suffix)).sort()
    if (names.length === 0)
      throw new Error(
        `\`${folder}\` holds no ${kind} rule, and no rule standing is not the same as no rule matching`
      )
    for (const name of names) {
      const relPath = `${folder}/${name}`
      rules.push(ruleOf(pageOf(`${root}/${relPath}`), relPath, kind))
    }
  }
  return rules
}
