import {
  refusing,
  spliced,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const OPENS = "{"

const SHUTS = "}"

const OPENS_LIST = "["

const SHUTS_LIST = "]"

const NEXT = ","

const QUOTE = '"'

const ESCAPE = "\\"

const OUTERMOST = 1

const NO_ENTRIES = "reads as no run of entries, so no key is respelled"

type Quoted = {
  readonly said: string
  readonly to: number
}

function quotedAt(text: string, from: number): Quoted | null {
  let at = from + 1
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === ESCAPE) {
      at = at + 2
      continue
    }
    if (here !== QUOTE) {
      at = at + 1
      continue
    }
    let said: unknown
    try {
      said = JSON.parse(text.slice(from, at + 1))
    } catch {
      return null
    }
    return typeof said === "string" ? { said, to: at + 1 } : null
  }
  return null
}

export type Keyed = {
  readonly spots: readonly Splice[]
  readonly holding: boolean
}

export function keyedIn(text: string, was: string, now: string): Keyed | null {
  const spots: Splice[] = []
  let holding = false
  let depth = 0
  let keying = false
  let at = 0
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === QUOTE) {
      const held = quotedAt(text, at)
      if (held === null) return null
      if (keying && depth === OUTERMOST) {
        if (held.said === now) holding = true
        if (held.said === was) spots.push({ from: at, to: held.to, put: JSON.stringify(now) })
      }
      keying = false
      at = held.to
      continue
    }
    if (here === OPENS || here === OPENS_LIST) {
      depth = depth + 1
      keying = here === OPENS && depth === OUTERMOST
    } else if (here === SHUTS || here === SHUTS_LIST) {
      depth = depth - 1
      keying = false
    } else if (here === NEXT) {
      keying = depth === OUTERMOST
    }
    at = at + 1
  }
  return depth === 0 ? { spots, holding } : null
}

export function overAll(text: string, spots: readonly Splice[]): Splice | null {
  const first = spots[0]
  const last = spots[spots.length - 1]
  if (first === undefined || last === undefined) return null
  const put: string[] = []
  let at = first.from
  for (const one of spots) {
    put.push(text.slice(at, one.from), one.put)
    at = one.to
  }
  return { from: first.from, to: last.to, put: put.join("") }
}

export function respelled(path: string, text: string, was: string, now: string): Said {
  const held = keyedIn(text, was, now)
  if (held === null) return refusing(`\`${path}\` ${NO_ENTRIES}`)
  if (held.holding) return refusing(`\`${path}\` states \`${now}\` already`)
  const over = overAll(text, held.spots)
  return over === null ? stating([]) : stating(spliced(path, text, over))
}

export type Given = {
  readonly at: string
  readonly was: string
  readonly now: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no key is respelled`)
  return respelled(given.at, text, given.was, given.now)
}
