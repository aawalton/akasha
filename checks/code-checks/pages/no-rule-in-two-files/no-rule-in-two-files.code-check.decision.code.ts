import {
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  pathsNaming,
  TYPED_KINDS,
} from "akasha/changes/modules/tree-searching/tree-searching.module.code.ts"
import {
  bodyOf,
  overEachFile,
  textIn,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { type Spelt, speltIn } from "akasha/code/reading/modules/code-rule/code-rule.module.code.ts"
import type { Said } from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"

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

function speltOver(change: Change, over: readonly string[], held: Spelling = new Map()): Saying {
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

export function everyFiledIn(shadow: Shadow, short: ReadonlySet<string> = new Set()): Saying {
  return (rule) =>
    shadow.index.saidOf(rule).filter((one) => shadow.holds(one.path) && !short.has(one.path))
}

function bothSaying(filed: Saying, spelt: Saying): Saying {
  return (rule) =>
    [...filed(rule), ...spelt(rule)].sort((one, two) => {
      if (one.path !== two.path) return one.path < two.path ? -1 : 1
      return one.place - two.place
    })
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

export function refusingBy(change: Change, every: Saying): readonly Judged[] {
  return overEachFile(change, (given) => {
    if (!textNamed(given.path)) return []
    return reasonsIn(given.path, bodyOf(given), every)
  })
}

export function refusalsOver(change: Change, shadow: Shadow, filed = false): readonly Judged[] {
  if (!change.changed.some(textNamed)) return []
  const short = filed ? shadow.index.ruleShort() : null
  if (short === null) return refusingBy(change, everySpeltIn(change, shadow))
  const few = new Set(short)
  return refusingBy(change, bothSaying(everyFiledIn(shadow, few), speltOver(change, short)))
}
