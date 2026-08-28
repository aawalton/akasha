import type { Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "../query/query.ts"
import { type Repo, addressIn, notIn, pathOf } from "./address.ts"
import { DEFINED_ON, KEY, ON, PROPERTY, SLUG, textIn } from "./declared.ts"
import { pagesUnder, statedAt } from "./files.ts"
import { valuedAs } from "./held.ts"

export type Unread = {
  readonly at: string
  readonly unread: string
}

const ROWS = "rows"

const JSONL = "jsonl"

const TARGET = "target-slug"

export type Holding = {
  readonly on: string
  readonly key: string
}

export type Held = {
  readonly holdings: readonly Holding[]
  readonly beyond: Readonly<Record<string, string>>
}

export const holdingsFor = (root: string, pageTypes: Iterable<string>): Map<string, Held> => {
  const filling = new Map<string, { holdings: Holding[]; beyond: Record<string, string> }>()
  for (const one of pageTypes) {
    if (!filling.has(one)) filling.set(one, { holdings: [], beyond: {} })
  }
  const held = new Map<string, Held>()
  if (filling.size === 0) return held
  const found = pagesUnder(root, new Set([PROPERTY]))
  for (const one of found.get(PROPERTY) ?? []) {
    const stated = statedAt(root, one)
    if (typeof stated === "string") continue
    const rows = textIn(stated, ROWS)
    if (rows === null) continue
    const target = textIn(stated, TARGET)
    const mine = target === null ? undefined : filling.get(target)
    if (mine === undefined) continue
    const on = textIn(stated, DEFINED_ON)
    const key = textIn(stated, KEY)
    if (on === null || !on.startsWith(ON) || key === null) continue
    if (rows !== JSONL) {
      mine.beyond[textIn(stated, SLUG) ?? one] = rows
      continue
    }
    mine.holdings.push({ on: on.slice(ON.length), key })
  }
  for (const [pageType, mine] of filling) {
    mine.holdings.sort((one, other) => one.on.localeCompare(other.on) || one.key.localeCompare(other.key))
    held.set(pageType, mine)
  }
  return held
}

export const holdingsOf = (root: string, pageType: string): Held =>
  holdingsFor(root, [pageType]).get(pageType) ?? { holdings: [], beyond: {} }

export const pagesFor = (
  repo: Repo,
  pageTypes: Iterable<string>
): Map<string, readonly string[]> => {
  const asked = new Set<string>()
  for (const one of pageTypes) asked.add(one)
  const pages = new Map<string, readonly string[]>()
  if (asked.size === 0) return pages
  const found = pagesUnder(repo.root, asked)
  for (const one of asked) {
    pages.set(
      one,
      (found.get(one) ?? []).map((at) => addressIn(repo.repo, at))
    )
  }
  return pages
}

export const pagesOf = (repo: Repo, pageType: string): readonly string[] =>
  pagesFor(repo, [pageType]).get(pageType) ?? []

export const pageAt = (
  repo: Repo,
  at: string,
  declared: Declared,
  now: number
): Page | Unread => {
  const path = pathOf(repo, at)
  if (path === null) return { at, unread: notIn(repo.repo) }
  const stated = statedAt(repo.root, path)
  if (typeof stated === "string") return { at, unread: stated }
  const properties: Record<string, Value> = {}
  for (const [key, property] of Object.entries(declared.properties)) {
    properties[key] = valuedAs(stated[key], property.type)
  }
  return { at, values: { now, properties } satisfies Values }
}
