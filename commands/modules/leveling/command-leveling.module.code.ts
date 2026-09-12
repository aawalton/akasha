import {
  type Held,
  partsOf,
  slugOfPart,
} from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import type { Level, Naming } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import {
  type Valued,
  valuesOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const NAME = "name"

const SLUG = "slug"

const SLASH = "/"

const DEFINITION = "definition"

export type Levels = ReadonlyMap<string, readonly Valued[]>

const held = new Map<string, Levels>()

export function definitionOf(page: Record<string, unknown> | null): string | null {
  const said = page === null ? null : page[DEFINITION]
  return typeof said === "string" ? said : null
}

function namedOf(value: Record<string, unknown>): string | null {
  const said = value[NAME]
  return typeof said === "string" ? said : null
}

export function levelsIn(root: string, types: readonly string[]): Levels {
  const at = [root, ...types].join(SLASH)
  const found = held.get(at)
  if (found !== undefined) return found
  const made = new Map<string, Valued[]>()
  for (const type of types) {
    for (const one of valuesOfType(root, type)) {
      const slug = one.value[SLUG]
      if (typeof slug !== "string") continue
      const under = made.get(`${type}${SLASH}${slug}`)
      if (under === undefined) made.set(`${type}${SLASH}${slug}`, [one])
      else under.push(one)
    }
  }
  held.set(at, made)
  return made
}

export function valuedUnder(levels: Levels, part: string): Valued | null {
  return levels.get(part)?.[0] ?? null
}

export function levelsOf(levels: Levels, part: string): readonly Level[] {
  const at = part.indexOf(SLASH)
  if (at === -1) return []
  const type = part.slice(0, at)
  const slug = part.slice(at + 1)
  return (levels.get(part) ?? []).map((one) => ({
    named: namedOf(one.value) ?? slug,
    slug,
    type,
    path: one.path,
    parts: partsOf(one.value),
  }))
}

export function levelOfPart(levels: Levels, part: string): Held | null {
  const one = valuedUnder(levels, part)
  if (one === null) return null
  return { named: namedOf(one.value) ?? slugOfPart(part), said: definitionOf(one.value) }
}

export function levelNamed(levels: Levels, types: readonly string[]): Naming {
  return (slug) => {
    for (const type of types) {
      const one = valuedUnder(levels, `${type}${SLASH}${slug}`)
      if (one !== null) return namedOf(one.value)
    }
    return null
  }
}
