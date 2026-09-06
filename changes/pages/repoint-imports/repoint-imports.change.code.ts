import { basename, dirname, extname, join, relative } from "node:path"
import { landingOf, placedIn, spelledIn } from "@akasha/code/code-specifier"
import {
  answered,
  moving,
  refusing,
  writing,
} from "../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../modules/change-shadow/change-shadow.module.code.ts"

const GENERATED = "+types"

const UNDER = "/"

function specifierFor(dir: string, target: string): string {
  const said = relative(dir, target)
  return said.startsWith(".") ? said : `./${said}`
}

function stemOf(path: string): string {
  const name = basename(path)
  const tail = extname(name)
  return tail === "" ? name : name.slice(0, -tail.length)
}

/** What a body names its own generated declarations by, which follows the body's folder and name. */
function generatedFor(was: string, now: string, said: string): string | null {
  const landed = landingOf(was, said)
  if (landed === null || landed !== join(dirname(was), GENERATED, stemOf(was))) return null
  return `.${UNDER}${GENERATED}${UNDER}${stemOf(now)}`
}

/** Where a name carrying no leading dot lands, read against the folder of the body naming it. */
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
  const rooted = moved.get(said)
  if (rooted !== undefined) return rooted
  const landed = landingOf(was, said)
  if (landed === null) return specifier ? null : beneathFor(was, dir, said, moved)
  const there = moved.get(landed)
  if (there !== undefined) return specifierFor(dir, there)
  return specifier ? specifierFor(dir, landed) : null
}

export function repointed(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): Answer {
  const dir = dirname(now)
  const specifier = new Set(placedIn(now, text).map((one) => one.start))
  let out = ""
  let at = 0
  for (const one of spelledIn(now, text)) {
    const next = nextFor(was, now, dir, one.text, moved, specifier.has(one.start))
    if (next === null || next === one.text) continue
    out = `${out}${text.slice(at, one.start)}${JSON.stringify(next)}`
    at = one.end
  }
  const body = `${out}${text.slice(at)}`
  return answered([was === now ? writing(now, text, body) : moving(was, now, text, body)])
}

// The paths that moved arrive as a plain object rather than a map, so an address reaches this
// change with arguments a command line and a caller in code can both spell.
export type Given = {
  readonly was: string
  readonly now: string
  readonly moved: Readonly<Record<string, string>>
}

export function runChange(world: World, given: Given): Answer {
  const text = world.textOf(given.was)
  if (text === null) return refusing(`\`${given.was}\` holds no body, so nothing is repointed`)
  return repointed(given.was, given.now, text, new Map(Object.entries(given.moved)))
}
