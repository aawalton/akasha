import type { Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "./query.ts"

export type Declaring = ReadonlyMap<string, Declared>

const NAMED = 3

const ABSENT: Value = { kind: "absent" }

const keysSaid = (keys: readonly string[]): string => keys.map((key) => `\`${key}\``).join(", ")

const typesSaid = (slugs: readonly string[]): string => {
  const shown = keysSaid(slugs.slice(0, NAMED))
  const rest = slugs.length - NAMED
  return rest > 0 ? `${shown} and ${rest} more` : shown
}

export const keysRefused = (
  keys: readonly string[],
  pageTypes: readonly string[],
  declaring: Declaring
): string | null => {
  if (keys.length === 0) {
    return "a query asking for keys asks for at least one, and this one asks for none"
  }

  const missing = pageTypes.filter((one) => !declaring.has(one))
  if (missing.length > 0) {
    return `the keys asked for are held to what every page type asked about declares, and nothing was handed in for ${typesSaid(missing)}`
  }

  const reached = new Set<string>()
  const beyond = new Map<string, string>()
  const bare: string[] = []
  for (const slug of pageTypes) {
    const declared = declaring.get(slug) as Declared
    let holds = false
    for (const key of keys) {
      if (key in declared.properties) {
        reached.add(key)
        holds = true
      } else {
        const spelling = declared.beyond[key]
        if (spelling !== undefined) beyond.set(key, spelling)
      }
    }
    if (!holds) bare.push(slug)
  }

  const nowhere = keys.filter((key) => !reached.has(key))
  const held = nowhere.find((key) => beyond.has(key))
  if (held !== undefined) {
    return `\`${held}\` is declared to hold \`${beyond.get(held)}\`, which a page is not answered with`
  }
  if (nowhere.length > 0) {
    return `no page type this asks about declares ${keysSaid(nowhere)}`
  }
  if (bare.length > 0) {
    return `no key asked for is declared by ${typesSaid(bare)}, whose pages would answer absent under every one of them`
  }
  return null
}

export const narrowed = (
  pages: readonly Page[],
  keys: readonly string[] | null
): readonly Page[] => {
  if (keys === null) return pages
  return pages.map((page) => {
    const properties: Record<string, Value> = {}
    for (const key of keys) properties[key] = page.values.properties[key] ?? ABSENT
    return { at: page.at, values: { now: page.values.now, properties } satisfies Values }
  })
}
