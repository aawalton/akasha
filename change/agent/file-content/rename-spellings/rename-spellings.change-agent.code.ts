import {
  type Answer,
  type FileChange,
  missing,
  notText,
  refusing,
  spliced,
  splicedTo,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { facingHeld, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { generatedIn } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"

const UNDER = "under"

const RENAMES = "renames"

const SPACED = /\s+/

const BOUNDARY = "[A-Za-z0-9_]"

const ESCAPED = /[.*+?^${}()|[\]\\]/g

const PARTED = "is no old and new spelling parted by a space"

const ALREADY = "names the spelling it already carries"

const NO_LINE = "no line was handed in, so no spelling is renamed"

const NO_TEXT = "holds no text, so no spelling is renamed"

const RENAMES_NOTHING = "and a rename that renames nothing is a misspelling"

const WOULD_MERGE = "would merge two names"

export type Pair = {
  readonly old: string
  readonly new: string
}

export type Read = { readonly pairs: readonly Pair[] } | { readonly refused: string }

export function readIn(said: string): Read {
  const pairs: Pair[] = []
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    const words = one.split(SPACED)
    const old = words[0]
    const now = words[1]
    if (words.length !== 2 || old === undefined || now === undefined) {
      return { refused: `\`${one}\` ${PARTED}` }
    }
    if (old === now) return { refused: `\`${one}\` ${ALREADY}` }
    pairs.push({ old, new: now })
  }
  return { pairs }
}

export function spelledIn(spelling: string): RegExp {
  const escaped = spelling.replace(ESCAPED, "\\$&")
  return new RegExp(`(?<!${BOUNDARY})${escaped}(?!${BOUNDARY})`, "g")
}

function occurs(spelling: string, text: string): boolean {
  return spelledIn(spelling).test(text)
}

type Body = {
  readonly path: string
  readonly text: string
}

function bodiesUnder(world: World, folder: string): readonly Body[] {
  const facing = facingHeld(world)
  const paths = new Set([...world.under(folder), ...(world.claimed?.(folder) ?? [])])
  const found: Body[] = []
  for (const path of [...paths].sort()) {
    if (generatedIn(facing, path)) continue
    const held = world.bodyOf(path)
    if (held === null || notText(held)) continue
    found.push({ path, text: held })
  }
  return found
}

function whyNot(folder: string, pairs: readonly Pair[], bodies: readonly Body[]): string | null {
  for (const one of pairs) {
    if (!bodies.some((body) => occurs(one.old, body.text))) {
      return `\`${one.old}\` occurs nowhere under \`${folder}\`, ${RENAMES_NOTHING}`
    }
    if (bodies.some((body) => occurs(one.new, body.text))) {
      return `\`${one.new}\` already occurs under \`${folder}\`, so \`${one.old} ${one.new}\` ${WOULD_MERGE}`
    }
  }
  return null
}

function renamed(text: string, pairs: readonly Pair[]): string {
  let now = text
  for (const one of pairs) now = now.replace(spelledIn(one.old), () => one.new)
  return now
}

export function renameSpellings(world: World, folder: string, pairs: readonly Pair[]): Answer {
  const bodies = bodiesUnder(world, folder)
  if (bodies.length === 0) return refusing(`\`${folder}\` ${NO_TEXT}`)
  const why = whyNot(folder, pairs, bodies)
  if (why !== null) return refusing(why)
  const edits: FileChange[] = []
  for (const one of bodies) {
    const now = renamed(one.text, pairs)
    if (now === one.text) continue
    edits.push(...spliced(one.path, one.text, splicedTo(one.text, now)))
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [UNDER, RENAMES]

export function runChange(world: World, given: Asked): Answer {
  const under = given[UNDER]
  if (under === undefined) return refusing(missing(UNDER))
  const said = given[RENAMES]
  if (said === undefined) return refusing(missing(RENAMES))
  const read = readIn(said)
  if ("refused" in read) return refusing(read.refused)
  if (read.pairs.length === 0) return refusing(NO_LINE)
  return renameSpellings(world, under, read.pairs)
}
