import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  EVERY_KIND,
  pathsNaming,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const APART = "[A-Za-z0-9-]"

const PATTERNED = /[.*+?^${}()|[\]\\]/g

export const AT_MOST = 5000

export function wholeWord(was: string): RegExp {
  return new RegExp(`(?<!${APART})${was.replace(PATTERNED, "\\$&")}(?!${APART})`)
}

export type Generated = (path: string) => boolean

export function generatedOn(world: World): Generated {
  const facing = facingOn(world.root)
  return (path) => generatedIn(facing, path)
}

export type Survived = { readonly named: readonly string[] } | { readonly past: number } | null

function readableIn(world: World, path: string): string | null {
  try {
    return world.textOf(path)
  } catch {
    return null
  }
}

export function survivedIn(
  world: World,
  was: string,
  generated: Generated = generatedOn(world)
): Survived {
  let found: readonly string[]
  try {
    found = pathsNaming(world, [was], EVERY_KIND)
  } catch {
    return null
  }
  if (found.length > AT_MOST) return { past: AT_MOST }
  const held = wholeWord(was)
  const named: string[] = []
  for (const path of found) {
    if (generated(path)) continue
    const text = readableIn(world, path)
    if (text === null || !held.test(text)) continue
    named.push(path)
  }
  return named.length === 0 ? null : { named: named.toSorted() }
}

const DECIDE = "a word is the old name only sometimes, so read each and decide"

export function survivalSaid(was: string, held: Survived): readonly string[] {
  if (held === null) return []
  if ("past" in held) {
    return [`\`${was}\` is written in more than ${counted(held.past, "file")}, too many to name`]
  }
  const many = counted(held.named.length, "file")
  return [
    `\`${was}\` is still written in ${many} this change did not reach — ${DECIDE}:
  ${held.named.join("\n  ")}`,
  ]
}

export function survivingSaid(world: World, was: string): readonly string[] {
  return survivalSaid(was, survivedIn(world, was))
}
