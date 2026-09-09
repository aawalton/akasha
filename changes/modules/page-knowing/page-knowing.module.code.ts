import type { Named } from "@akasha/indexes"
import { eachTarget, type Shaped } from "@akasha/indexes/reaching"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
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
