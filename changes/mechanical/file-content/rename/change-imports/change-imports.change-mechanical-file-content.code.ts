import { basename, dirname, extname, join, relative } from "node:path"
import {
  notText,
  refusing,
  splicing,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { landedAt } from "akasha/code/folder-spelling/folder-spelling.module.code.ts"
import {
  landingOf,
  placedIn,
  specifierFor,
  spelledIn,
} from "akasha/code/modules/specifier/code-specifier.module.code.ts"
import { runsIn } from "akasha/code/path-runs/path-runs.module.code.ts"

const GENERATED = "+types"

const UNDER = "/"

const CODE = new Set([".ts", ".tsx"])

const ROOT = "akasha/"

const RELATIVE = /^\.\.?\//

const LINES = "\n"

const MAPPED = new WeakMap<Readonly<Record<string, string>>, ReadonlyMap<string, string>>()

const NOTHING_MOVED: Readonly<Record<string, string>> = {}

export type Landing = (path: string) => string | null

export type Known = (path: string) => boolean

const NAMED = new WeakMap<World, ReadonlySet<string>>()

function namesIn(world: World): ReadonlySet<string> {
  const held = NAMED.get(world)
  if (held !== undefined) return held
  const made = new Set<string>()
  for (const path of world.index.everyPath()) {
    made.add(path)
    for (let at = path.indexOf(UNDER); at >= 0; at = path.indexOf(UNDER, at + 1)) {
      made.add(path.slice(0, at))
    }
  }
  NAMED.set(world, made)
  return made
}

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

function beneathFor(was: string, dir: string, said: string, landing: Landing): string | null {
  if (said.startsWith(UNDER) || !said.includes(UNDER)) return null
  const home = dirname(was)
  const from = join(home, said)
  const there = landing(from)
  if (there === null) return null
  const put = relative(dir, there)
  return put === relative(home, from) ? null : put
}

function rootedFor(said: string, landing: Landing): string | null {
  if (!said.startsWith(ROOT)) return null
  const there = landing(said.slice(ROOT.length))
  return there === null ? null : `${ROOT}${there}`
}

function nextFor(
  was: string,
  now: string,
  dir: string,
  said: string,
  landing: Landing,
  specifier: boolean
): string | null {
  if (specifier) {
    const generated = generatedFor(was, now, said)
    if (generated !== null) return generated
  }
  const under = rootedFor(said, landing)
  if (under !== null) return under
  const rooted = landing(said)
  if (rooted !== null) return rooted
  const landed = landingOf(was, said)
  if (landed === null) return specifier ? null : beneathFor(was, dir, said, landing)
  if (said.startsWith(ROOT)) return null
  const carried = landing(landed)
  if (carried !== null) return endedAs(said, specifierFor(dir, carried))
  return specifier ? endedAs(said, specifierFor(dir, landed)) : null
}

function withinFor(
  was: string,
  dir: string,
  said: string,
  landing: Landing,
  known: Known
): string | null {
  const splices = runsFor(was, dir, said, landing, known)
  return splices.length === 0 ? null : putOver(said, splices)
}

export function changeImports(
  was: string,
  now: string,
  text: string,
  landing: Landing,
  known: Known
): Said {
  const dir = dirname(now)
  const specifier = new Set(placedIn(now, text).map((one) => one.start))
  const splices: Splice[] = []
  for (const one of spelledIn(now, text)) {
    const held = specifier.has(one.start)
    const next =
      nextFor(was, now, dir, one.text, landing, held) ??
      (held ? null : withinFor(was, dir, one.text, landing, known))
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

function endedAs(run: string, put: string): string {
  return run.endsWith(UNDER) && !put.endsWith(UNDER) ? `${put}${UNDER}` : put
}

function nearFor(was: string, dir: string, run: string, landing: Landing): Pointed | null {
  if (!RELATIVE.test(run)) return null
  const landed = landingOf(was, run)
  if (landed === null) return null
  const there = landing(landed)
  if (there === null) return null
  return { at: 0, said: run, put: endedAs(run, specifierFor(dir, there)) }
}

function anchoredFor(
  run: string,
  said: readonly string[],
  landing: Landing,
  known: Known
): Pointed | null {
  if (RELATIVE.test(run)) return null
  for (const one of said) {
    const there = landing(one)
    if (there !== null) return { at: run.length - one.length, said: one, put: there }
    if (known(one)) return null
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

function putOver(text: string, splices: readonly Splice[]): string {
  let put = ""
  let at = 0
  for (const one of splices) {
    put = `${put}${text.slice(at, one.from)}${one.put}`
    at = one.to
  }
  return `${put}${text.slice(at)}`
}

function runsFor(
  was: string,
  dir: string,
  text: string,
  landing: Landing,
  known: Known
): readonly Splice[] {
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
    const held = nearFor(was, dir, whole, landing) ?? anchoredFor(whole, run.said, landing, known)
    if (held === null || held.put === held.said) continue
    const from = open + found + held.at
    splices.push({ from, to: from + held.said.length, put: held.put })
  }
  return splices
}

export function changeRuns(
  was: string,
  now: string,
  text: string,
  landing: Landing,
  known: Known
): Said {
  return stating(splicing(now, text, runsFor(was, dirname(now), text, landing, known)))
}

export type Carried = {
  readonly from: string
  readonly to: string
}

export type Given = {
  readonly was: string
  readonly now: string
  readonly moved?: Readonly<Record<string, string>>
  readonly carried?: Carried
}

function mapFor(moved: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  const held = MAPPED.get(moved)
  if (held !== undefined) return held
  const made = new Map(Object.entries(moved))
  MAPPED.set(moved, made)
  return made
}

function landingFor(given: Given): Landing {
  const carried = given.carried
  if (carried !== undefined) return (path) => landedAt(path, carried.from, carried.to)
  const moved = mapFor(given.moved ?? NOTHING_MOVED)
  return (path) => moved.get(path) ?? null
}

export function runChange(world: World, given: Given): Said {
  const held = world.bodyOf(given.now) ?? world.bodyOf(given.was)
  if (notText(held)) return stating([])
  if (held === null) return refusing(`\`${given.now}\` holds no body, so nothing is repointed`)
  const landing = landingFor(given)
  const names = namesIn(world)
  const known: Known = (path) => names.has(path)
  if (CODE.has(extname(given.now))) {
    return changeImports(given.was, given.now, held, landing, known)
  }
  return changeRuns(given.was, given.now, held, landing, known)
}
