import { basename, dirname, extname, join, relative } from "node:path"
import {
  notText,
  refusing,
  splicing,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  landingOf,
  placedIn,
  specifierFor,
  spelledIn,
} from "akasha/code-system/code-specifier/code-specifier.module.code.ts"
import { runsIn } from "akasha/code-system/path-runs/path-runs.module.code.ts"

const GENERATED = "+types"

const UNDER = "/"

const CODE = new Set([".ts", ".tsx"])

const ROOT = "akasha/"

const RELATIVE = /^\.\.?\//

const LINES = "\n"

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
  if (said.startsWith(ROOT)) return null
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

type Pointed = {
  readonly at: number
  readonly said: string
  readonly put: string
}

function nearFor(
  was: string,
  dir: string,
  run: string,
  moved: ReadonlyMap<string, string>
): Pointed | null {
  if (!RELATIVE.test(run)) return null
  const landed = landingOf(was, run)
  if (landed === null) return null
  const there = moved.get(landed)
  return there === undefined ? null : { at: 0, said: run, put: specifierFor(dir, there) }
}

function anchoredFor(
  run: string,
  said: readonly string[],
  moved: ReadonlyMap<string, string>
): Pointed | null {
  if (RELATIVE.test(run)) return null
  for (const one of said) {
    const there = moved.get(one)
    if (there !== undefined) return { at: run.length - one.length, said: one, put: there }
  }
  return null
}

function openingsIn(lines: readonly string[]): readonly number[] {
  const found: number[] = []
  let at = 0
  for (const line of lines) {
    found.push(at)
    at += line.length + LINES.length
  }
  return found
}

export function changeRuns(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): Said {
  const dir = dirname(now)
  const lines = text.split(LINES)
  const opens = openingsIn(lines)
  const splices: Splice[] = []
  let over = -1
  let cursor = 0
  for (const run of runsIn(text)) {
    if (run.line !== over) {
      over = run.line
      cursor = 0
    }
    const whole = run.said[0]
    const line = lines[run.line - 1]
    const open = opens[run.line - 1]
    if (whole === undefined || line === undefined || open === undefined) continue
    const found = line.indexOf(whole, cursor)
    if (found < 0) continue
    cursor = found + whole.length
    const held = nearFor(was, dir, whole, moved) ?? anchoredFor(whole, run.said, moved)
    if (held === null || held.put === held.said) continue
    const from = open + found + held.at
    splices.push({ from, to: from + held.said.length, put: held.put })
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
  const held = world.bodyOf(given.now) ?? world.bodyOf(given.was)
  if (notText(held)) return stating([])
  if (held === null) return refusing(`\`${given.now}\` holds no body, so nothing is repointed`)
  const moved = mapFor(given.moved)
  if (CODE.has(extname(given.now))) return changeImports(given.was, given.now, held, moved)
  return changeRuns(given.was, given.now, held, moved)
}
