
import { readFile, readdir } from "node:fs/promises"
import { fileStemOf } from "../page/name/name"
import { join } from "node:path"
import { parse } from "../page/document/parse.ts"
import type { Document } from "../page/document/types.ts"
import { parseMatch, ruleFolders, unpaired } from "../tools/lib/category-rule.ts"
import type { Condition } from "../tools/lib/category-rule.ts"
import { checkedRule } from "./rule-clauses.ts"
import { categoryTitles } from "./rule-pages.ts"
import type { CounterpartSpec, Outcome, Rule } from "./rules.ts"

const ROOT = new URL("..", import.meta.url).pathname

const MONTHS: Readonly<Record<string, number>> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
}

export interface AgentRule {
  readonly slug: string
  readonly conditions: readonly Condition[]
}

export interface RuleSet {
  readonly rules: readonly Rule[]
  readonly agentRules: readonly AgentRule[]
  readonly off: readonly string[]
}

function scalarKey(document: Document, name: string): string | null {
  const key = document.frontmatter.find((one) => one.name === name)
  if (key === undefined) return null
  if (key.value.kind !== "scalar") throw new Error(`${document.path}: \`${name}\` is not a single value`)
  return unquoted(key.value.value.text)
}

function unquoted(text: string): string {
  const trimmed = text.trim()
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
  }
  return trimmed
}

function valuesOf(conditions: readonly Condition[], field: string, test: string): readonly string[] {
  return conditions
    .filter((one) => one.field === field && one.test === test && !one.negated)
    .flatMap((one) => one.values)
}

function valuesNotOf(conditions: readonly Condition[], field: string, test: string): readonly string[] {
  return conditions
    .filter((one) => one.field === field && one.test === test && one.negated)
    .flatMap((one) => one.values)
}

function oneEach(document: string, conditions: readonly Condition[]): void {
  const seen = new Set<string>()
  for (const one of conditions) {
    if (one.field === "description") continue
    if (seen.has(one.field)) throw new Error(`${document}: two \`${one.field}\` conditions; a field carries one`)
    seen.add(one.field)
  }
}

function groupsOf(
  conditions: readonly Condition[],
  field: string,
  test: string
): readonly (readonly string[])[] {
  return conditions
    .filter((one) => one.field === field && one.test === test && !one.negated)
    .map((one) => one.values)
}

const NEGATED_READ: ReadonlySet<string> = new Set([
  "sign is",
  "account is",
  "amount is",
  "month is",
  "date on or after",
])

function everyConditionUsed(document: string, conditions: readonly Condition[]): void {
  const unread = conditions.filter(
    (one) => one.negated && !NEGATED_READ.has(`${one.field} ${one.test}`)
  )
  if (unread.length > 0) {
    const spelled = unread.map((one) => `\`${one.field} ${one.test}\``).join(", ")
    throw new Error(
      `${document}: ${spelled} — negated, and this reader consumes that comparison only positively, ` +
        "so the rule would run wider than it says"
    )
  }
  const loose = unpaired(conditions)
  if (loose.length === 0) return
  const named = loose.map((one) => `\`${one.field} ${one.test}\``).join(", ")
  throw new Error(
    `${document}: ${named} — a comparison that field does not take, so the clause would be read ` +
      "by nothing and the rule would match more than it says"
  )
}

function signOf(document: string, conditions: readonly Condition[]): "positive" | "negative" | null {
  const values = valuesOf(conditions, "sign", "is")
  if (values.length === 0) return null
  const only = values[0]
  if (values.length > 1 || (only !== "positive" && only !== "negative")) {
    throw new Error(`${document}: \`sign\` is one of positive or negative, not ${values.join(", ")}`)
  }
  return only
}

function signNotOf(document: string, conditions: readonly Condition[]): "positive" | "negative" | null {
  const values = valuesNotOf(conditions, "sign", "is")
  if (values.length === 0) return null
  const only = values[0]
  if (values.length > 1 || (only !== "positive" && only !== "negative")) {
    throw new Error(`${document}: \`sign is not\` names positive or negative, not ${values.join(", ")}`)
  }
  return only
}

function amountFrom(document: string, text: string): number {
  const value = Number.parseFloat(text)
  if (!Number.isFinite(value)) throw new Error(`${document}: \`${text}\` is not an amount`)
  return value
}

function amountsOf(document: string, conditions: readonly Condition[]): readonly number[] {
  return valuesOf(conditions, "amount", "is").map((text) => amountFrom(document, text))
}

function amountsNotOf(document: string, conditions: readonly Condition[]): readonly number[] {
  return valuesNotOf(conditions, "amount", "is").map((text) => amountFrom(document, text))
}

function monthFrom(document: string, name: string): number {
  const month = MONTHS[name.toLowerCase()]
  if (month === undefined) throw new Error(`${document}: \`${name}\` is not a month`)
  return month
}

function monthsOf(document: string, conditions: readonly Condition[]): readonly number[] {
  return valuesOf(conditions, "month", "is").map((name) => monthFrom(document, name))
}

function monthsNotOf(document: string, conditions: readonly Condition[]): readonly number[] {
  return valuesNotOf(conditions, "month", "is").map((name) => monthFrom(document, name))
}

function floorOf(document: string, conditions: readonly Condition[]): string | null {
  const values = valuesOf(conditions, "date", "on or after")
  if (values.length === 0) return null
  const only = values[0]
  if (values.length > 1 || only === undefined) {
    throw new Error(`${document}: \`date on or after\` takes one day, not ${values.length}`)
  }
  return only
}

function ceilingOf(document: string, conditions: readonly Condition[]): string | null {
  const values = valuesNotOf(conditions, "date", "on or after")
  if (values.length === 0) return null
  const only = values[0]
  if (values.length > 1 || only === undefined) {
    throw new Error(`${document}: \`date is before\` takes one day, not ${values.length}`)
  }
  return only
}

function counterpartOf(document: string, stated: string | null): CounterpartSpec | null {
  if (stated === null) return null
  const withinDays = Number.parseInt(stated, 10)
  if (!Number.isFinite(withinDays)) throw new Error(`${document}: \`counterpart-within-days: ${stated}\` is not a count`)
  return { withinDays }
}

function outcomeOf(document: string, category: string | null, byTitle: ReadonlyMap<string, string>): Outcome {
  if (category === null) return { kind: "reserve" }
  const id = byTitle.get(category.toLowerCase())
  if (id === undefined) {
    throw new Error(`${document}: no category is titled "${category}". It may have been merged or renamed in Monarch.`)
  }
  return { kind: "categorize", category: id }
}

async function categoriesByTitle(): Promise<ReadonlyMap<string, string>> {
  const byId = await categoryTitles()
  const byTitle = new Map<string, string>()
  for (const [id, title] of byId) {
    const key = title.toLowerCase()
    if (byTitle.has(key)) throw new Error(`two categories are titled "${title}", so a rule naming it names neither`)
    byTitle.set(key, id)
  }
  return byTitle
}

interface Standing {
  readonly kind: string
  readonly slug: string
  readonly path: string
}

async function standing(): Promise<readonly Standing[]> {
  const found: Standing[] = []
  const held = new Map<string, string>()
  const folders = ruleFolders()
  for (const kind of Object.keys(folders).sort()) {
    const folder = folders[kind] as string
    for (const name of (await readdir(join(ROOT, folder))).sort()) {
      if (!name.endsWith(".md")) continue
      const slug = fileStemOf(name)
      const path = `${folder}/${name}`
      const already = held.get(slug)
      if (already !== undefined) {
        throw new Error(`\`${slug}\` stands at ${already} and at ${path}, so nothing says which carries it`)
      }
      held.set(slug, path)
      found.push({ kind, slug, path })
    }
  }
  return found
}

export async function loadCategoryRules(): Promise<RuleSet> {
  const byTitle = await categoriesByTitle()

  const rules: Rule[] = []
  const agentRules: AgentRule[] = []
  const off: string[] = []

  for (const { kind, slug, path } of await standing()) {
    const text = await readFile(join(ROOT, path), "utf8")
    const document = parse(text, path)
    const match = parseMatch(text)
    if (match.stray > 0) {
      throw new Error(`${path}: ${match.stray} line(s) under \`# Match\` this reader cannot understand`)
    }
    oneEach(path, match.conditions)
    everyConditionUsed(path, match.conditions)

    if (scalarKey(document, "mode") === "off") {
      off.push(slug)
      continue
    }
    if (kind === "agent") {
      agentRules.push({ slug, conditions: match.conditions })
      continue
    }
    rules.push(
      checkedRule({
        name: slug,
        merchantIs: valuesOf(match.conditions, "merchant", "is"),
        merchantContains: valuesOf(match.conditions, "merchant", "contains"),
        statementContains: valuesOf(match.conditions, "statement", "contains"),
        descriptionContains: groupsOf(match.conditions, "description", "contains"),
        accountIs: valuesOf(match.conditions, "account", "is"),
        accountIsNot: valuesNotOf(match.conditions, "account", "is"),
        amountSign: signOf(path, match.conditions),
        amountSignIsNot: signNotOf(path, match.conditions),
        amountIs: amountsOf(path, match.conditions),
        amountIsNot: amountsNotOf(path, match.conditions),
        onOrAfter: floorOf(path, match.conditions),
        before: ceilingOf(path, match.conditions),
        monthIs: monthsOf(path, match.conditions),
        monthIsNot: monthsNotOf(path, match.conditions),
        counterpart: counterpartOf(path, scalarKey(document, "counterpart-within-days")),
        note: scalarKey(document, "note"),
        outcome: outcomeOf(path, scalarKey(document, "category"), byTitle),
      })
    )
  }
  return { rules, agentRules, off }
}
