import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  pathsNaming,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  bodyOf,
  overEachFile,
  textIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { type Spelt, speltIn } from "akasha/code/reading/modules/code-rule/code-rule.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export type Said = {
  readonly path: string
  readonly place: number
  readonly name: string
}

export type Saying = (rule: string) => readonly Said[]

type Spelling = Map<string, readonly Spelt[]>

const ORDERED = /^\$\d+$/

const BROKEN = /[\n\r]/

function speltAt(change: Change, path: string, held: Spelling): readonly Spelt[] {
  const found = held.get(path)
  if (found !== undefined) return found
  const text = textIn(change, path)
  const made = text === null ? [] : speltIn(path, text)
  held.set(path, made)
  return made
}

function speltOver(change: Change, over: readonly string[], held: Spelling): Saying {
  const spelt = over.flatMap((path) => {
    if (!textNamed(path)) return []
    return speltAt(change, path, held)
      .filter((one) => !one.forwards)
      .map((one, place) => ({ rule: one.rule, path, place, name: one.name }))
  })
  const every = Map.groupBy(spelt, (one) => one.rule)
  return (rule) => every.get(rule) ?? []
}

function wordOf(rule: string): string | null {
  let best: string | null = null
  for (const word of rule.split(" ")) {
    if (word === "" || ORDERED.test(word) || BROKEN.test(word)) continue
    if (best === null || word.length > best.length) best = word
  }
  return best
}

function wordsIn(change: Change, held: Spelling): readonly string[] {
  const found = new Set<string>()
  for (const path of change.changed) {
    if (!textNamed(path)) continue
    for (const one of speltAt(change, path, held)) {
      if (one.forwards || one.literal) continue
      const word = wordOf(one.rule)
      if (word !== null) found.add(word)
    }
  }
  return [...found]
}

function worldOf(change: Change, shadow: Shadow): World {
  return {
    root: change.root,
    index: shadow.index,
    textOf: (path) => textIn(change, path),
    bodyOf: (path) => textIn(change, path),
    under: () => [],
    base: (path) => textIn(change, path),
    over: NOTHING_OVER,
  }
}

function pathsHolding(change: Change, shadow: Shadow, held: Spelling): readonly string[] {
  const asked = wordsIn(change, held)
  if (asked.length === 0) return []
  const found = new Set(pathsNaming(worldOf(change, shadow), asked, TYPED_KINDS))
  for (const path of change.changed) found.add(path)
  return [...found].sort()
}

export function everySpeltIn(change: Change, shadow: Shadow): Saying {
  const held: Spelling = new Map()
  return speltOver(change, pathsHolding(change, shadow, held), held)
}

export function reasonsIn(path: string, text: string, every: Saying): readonly string[] {
  const said: string[] = []
  for (const one of speltIn(path, text)) {
    if (one.forwards || one.literal) continue
    const apart = every(one.rule).filter((each) => each.path !== path)
    const first = apart[0]
    if (first === undefined) continue
    const more = apart.length > 1 ? `, and in ${apart.length - 1} more` : ""
    said.push(
      `\`${one.name}\` says what \`${first.name}\` in ${first.path} says${more} — ` +
        "one rule belongs in one file, reached by importing it"
    )
  }
  return said
}

function refusingBy(change: Change, every: Saying): readonly Judged[] {
  return overEachFile(change, textNamed, (given) => reasonsIn(given.path, bodyOf(given), every))
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  if (!change.changed.some(textNamed)) return []
  return refusingBy(change, everySpeltIn(change, shadow))
}
