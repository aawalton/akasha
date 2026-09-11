import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { eachTarget, type Shaped } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Named } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  slugOf,
  textAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"

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

export function spelledIn(world: World, value: Value, key: string): string | null {
  const said = exportedAs(key)
  if (said === key) return null
  const stated = typeIn(value)
  if (stated === null) return null
  const carried = world.index.propertiesIfNamed(stated)
  if (carried === null) return null
  return carried.some((each) => each.key === said) ? said : null
}

const SIBLINGS = 64

export function afterIn(world: World, value: Value, key: string): string | null {
  const stated = typeIn(value)
  if (stated === null || Object.hasOwn(value, key)) return null
  const before = new Map<string, number>()
  const behind = new Map<string, number>()
  let seen = 0
  for (const other of world.index.valuesByPath(stated).values()) {
    if (seen >= SIBLINGS) break
    const keys = Object.keys(other)
    const at = keys.indexOf(key)
    if (at < 0) continue
    seen += 1
    for (const [held, one] of keys.entries()) {
      if (held === at) continue
      const counted = held < at ? before : behind
      counted.set(one, (counted.get(one) ?? 0) + 1)
    }
  }
  let last: string | null = null
  for (const one of Object.keys(value)) {
    if ((before.get(one) ?? 0) > (behind.get(one) ?? 0)) last = one
  }
  return last
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
