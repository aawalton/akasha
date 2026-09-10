import { basename, dirname, extname, join, relative } from "node:path"
import { landingOf, placedIn, specifierFor, spelledIn } from "@akasha/code/code-specifier"
import {
  notText,
  refusing,
  splicing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const GENERATED = "+types"

const UNDER = "/"

const CODE = new Set([".ts", ".tsx"])

const ROOT = "akasha/"

const MAPPED = new WeakMap<Readonly<Record<string, string>>, ReadonlyMap<string, string>>()

function stemOf(path: string): string {
  const name = basename(path)
  const tail = extname(name)
  return tail === "" ? name : name.slice(0, -tail.length)
}

function generatedFor(was: string, now: string, said: string): string | null {
  const landed = landingOf(was, said)
  if (landed === null || landed !== join(dirname(was), GENERATED, stemOf(was))) return null
  return `.${UNDER}${GENERATED}${UNDER}${stemOf(now)}`
}

function beneathFor(
  was: string,
  dir: string,
  said: string,
  moved: ReadonlyMap<string, string>
): string | null {
  if (said.startsWith(UNDER) || !said.includes(UNDER)) return null
  const there = moved.get(join(dirname(was), said))
  return there === undefined ? null : relative(dir, there)
}

function rootedFor(said: string, moved: ReadonlyMap<string, string>): string | null {
  if (!said.startsWith(ROOT)) return null
  const there = moved.get(said.slice(ROOT.length))
  return there === undefined ? null : `${ROOT}${there}`
}

function nextFor(
  was: string,
  now: string,
  dir: string,
  said: string,
  moved: ReadonlyMap<string, string>,
  specifier: boolean
): string | null {
  if (specifier) {
    const generated = generatedFor(was, now, said)
    if (generated !== null) return generated
  }
  const under = rootedFor(said, moved)
  if (under !== null) return under
  const rooted = moved.get(said)
  if (rooted !== undefined) return rooted
  const landed = landingOf(was, said)
  if (landed === null) return specifier ? null : beneathFor(was, dir, said, moved)
  const carried = moved.get(landed)
  if (carried !== undefined) return specifierFor(dir, carried)
  return specifier ? specifierFor(dir, landed) : null
}

export function changeImports(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): Said {
  const dir = dirname(now)
  const specifier = new Set(placedIn(now, text).map((one) => one.start))
  const splices: Splice[] = []
  for (const one of spelledIn(now, text)) {
    const next = nextFor(was, now, dir, one.text, moved, specifier.has(one.start))
    if (next === null || next === one.text) continue
    splices.push({ from: one.start, to: one.end, put: JSON.stringify(next) })
  }
  return stating(splicing(now, text, splices))
}

export type Given = {
  readonly was: string
  readonly now: string
  readonly moved: Readonly<Record<string, string>>
}

function mapFor(moved: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  const held = MAPPED.get(moved)
  if (held !== undefined) return held
  const made = new Map(Object.entries(moved))
  MAPPED.set(moved, made)
  return made
}

export function runChange(world: World, given: Given): Said {
  if (!CODE.has(extname(given.now))) return stating([])
  const held = world.bodyOf(given.now) ?? world.bodyOf(given.was)
  if (notText(held)) return stating([])
  if (held === null) return refusing(`\`${given.now}\` holds no body, so nothing is repointed`)
  return changeImports(given.was, given.now, held, mapFor(given.moved))
}
