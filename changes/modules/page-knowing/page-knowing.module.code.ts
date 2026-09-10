import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { eachTarget, type Shaped } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Named } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { slugOf, textAt, type Value } from "akasha/pages/value/page-value.module.code.ts"
import type { World } from "../shadow/change-shadow.module.code.ts"

export type Read = { readonly known: Shaped; readonly value: Value } | { readonly refused: string }

export function pageIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0) return null
  return world.index.pageByPath(at)
}

export function namersIn(world: World, at: string, propertySlug: string): readonly Named[] {
  const found: Named[] = []
  for (const one of world.index.listedByPath(at)) {
    for (const namer of world.index.namersOf(one.id)) {
      if (namer.propertySlug === propertySlug) found.push(namer)
    }
  }
  return found
}

export function targetsIn(known: Shaped, value: Value, key: string): readonly string[] {
  const slug = known.slugOfKeyIn(value, key)
  return slug === null ? [] : eachTarget(known.targetOf(slug))
}

export type Held = { readonly known: Shaped } | { readonly refused: string }

export function heldIn(world: World): Held {
  try {
    return { known: world.index.knownIn() }
  } catch (cause) {
    return { refused: cause instanceof Error ? cause.message : String(cause) }
  }
}

export function readFor(world: World, at: string): Read {
  const held = heldIn(world)
  if ("refused" in held) return { refused: `${held.refused}, so \`${at}\` was not read` }
  let value: Value | null
  try {
    value = pageIn(world, at)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { refused: `${why}, so \`${at}\` was not read` }
  }
  if (value === null) return { refused: `\`${at}\` names no page` }
  return { known: held.known, value }
}

export function typeIn(value: Value): string | null {
  const stated = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
  return stated === null ? null : slugOf(stated)
}

export function declaresIn(world: World, value: Value, key: string): boolean | null {
  const stated = typeIn(value)
  if (stated === null) return null
  const carried = world.index.propertiesIfNamed(stated)
  if (carried === null) return null
  return carried.some((each) => each.key === key)
}

const BOOLEAN_PROPERTY = "boolean-property"

const NUMBER_PROPERTY = "number-property"

const BOOLEAN = "boolean"

const NUMBER = "number"

export function holdsIn(world: World, value: Value, key: string): string | null {
  const stated = typeIn(value)
  if (stated === null) return null
  const carried = world.index.propertiesIfNamed(stated)
  if (carried === null) return null
  const one = carried.find((each) => each.key === key)
  if (one === undefined) return null
  if (world.index.kindsUnder(BOOLEAN_PROPERTY).has(one.pageTypeSlug)) return BOOLEAN
  if (world.index.kindsUnder(NUMBER_PROPERTY).has(one.pageTypeSlug)) return NUMBER
  return null
}

export function singleIn(world: World, value: Value, key: string): boolean {
  const stated = typeIn(value)
  if (stated === null) return false
  const carried = world.index.propertiesIfNamed(stated)
  if (carried === null) return false
  const one = carried.find((each) => each.key === key)
  return one !== undefined && !one.many
}
