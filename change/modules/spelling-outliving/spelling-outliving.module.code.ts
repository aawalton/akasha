import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  EVERY_KIND,
  pathsNaming,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { uncommittedSpelled } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const APART = "[A-Za-z0-9-]"

const PATTERNED = /[.*+?^${}()|[\]\\]/g

export const AT_MOST = 5000

function wholeWords(every: readonly string[]): RegExp {
  const held = [...every]
    .sort((one, two) => two.length - one.length)
    .map((one) => one.replace(PATTERNED, "\\$&"))
  return new RegExp(`(?<!${APART})(?:${held.join("|")})(?!${APART})`, "g")
}

export type Generated = (path: string) => boolean

function generatedOn(world: World): Generated {
  const facing = facingOn(world.root)
  return (path) => generatedIn(facing, path)
}

export type Survived = { readonly named: readonly string[] } | { readonly past: number } | null

export type Surviving = ReadonlyMap<string, Survived>

function readableIn(world: World, path: string): string | null {
  try {
    return world.textOf(path)
  } catch {
    return null
  }
}

function survivalOf(named: readonly string[]): Survived {
  if (named.length === 0) return null
  return named.length > AT_MOST ? { past: AT_MOST } : { named: named.toSorted() }
}

export function survivedOver(
  world: World,
  every: readonly string[],
  generated: Generated = generatedOn(world)
): Surviving {
  const names = [...new Set(every)]
  if (names.length === 0) return new Map()
  let paths: readonly string[]
  try {
    paths = pathsNaming(world, names, EVERY_KIND)
  } catch {
    return new Map(names.map((one): [string, Survived] => [one, null]))
  }
  const found = new Map(names.map((one): [string, string[]] => [one, []]))
  const held = wholeWords(names)
  for (const path of paths) {
    if (uncommittedSpelled(path) || generated(path)) continue
    const text = readableIn(world, path)
    if (text === null) continue
    const seen = new Set<string>()
    for (const each of text.matchAll(held)) {
      const one = each[0]
      if (one !== undefined) seen.add(one)
    }
    for (const one of seen) found.get(one)?.push(path)
  }
  return new Map(names.map((one): [string, Survived] => [one, survivalOf(found.get(one) ?? [])]))
}

export function survivedIn(
  world: World,
  was: string,
  generated: Generated = generatedOn(world)
): Survived {
  return survivedOver(world, [was], generated).get(was) ?? null
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

export function survivingEachSaid(world: World, every: readonly string[]): readonly string[] {
  return [...survivedOver(world, every)].flatMap(([was, one]) => survivalSaid(was, one))
}
