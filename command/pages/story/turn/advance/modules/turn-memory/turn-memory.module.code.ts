import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import {
  ADD_FILE,
  tellerOf,
} from "akasha/command/pages/story/modules/tell-continuing/tell-continuing.module.code.ts"
import { askedFor, type Reading } from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Memory } from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import {
  BEATS,
  type Handed,
  type Held,
  PLAYER,
  RECORDERS,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const FACT = "fact"

const AT = "at"

const OLD = "old"

const NEW = "new"

const BODY = "body"

const PARTED = "/"

const DOT = "."

type Refused = { readonly refused: string }

type Over = {
  readonly texts: Map<string, string | null>
  readonly listed: Map<string, string>
}

function overlaid(base: Reading, over: Over): Reading {
  const { texts, listed } = over
  return {
    ...base,
    listedAt: (pageTypeSlug, slug) => {
      const added = listed.get(`${pageTypeSlug}${PARTED}${slug}`)
      return added === undefined ? base.listedAt(pageTypeSlug, slug) : [{ path: added }]
    },
    textOf: (path) => (texts.has(path) ? (texts.get(path) ?? null) : base.textOf(path)),
    valueAt: (path) => {
      if (!texts.has(path)) return base.valueAt(path)
      const text = texts.get(path)
      return text === null || text === undefined ? null : valueIn(text)
    },
  }
}

function addressOf(path: string): string | null {
  const parts = path.slice(path.lastIndexOf(PARTED) + 1).split(DOT)
  const [slug] = parts
  const type = parts.at(-2)
  return parts.length < 3 || slug === undefined || type === undefined
    ? null
    : `${type}${PARTED}${slug}`
}

function applied(over: Over, reading: Reading, one: Asking): string | null {
  const given: Readonly<{ [key: string]: unknown }> = one.given
  const at = given[AT]
  if (typeof at !== "string") return null
  const old = given[OLD]
  const now = given[NEW]
  const body = given[BODY]
  if (typeof old === "string" && typeof now === "string") {
    over.texts.set(at, (reading.textOf(at) ?? "").replace(old, now))
  } else if (typeof body === "string") {
    over.texts.set(at, body)
    const address = one.at === ADD_FILE ? addressOf(at) : null
    if (address !== null) over.listed.set(address, at)
  } else {
    over.texts.set(at, null)
  }
  return at
}

function knowersOf(reading: Reading, page: string, fact: string): readonly string[] | null {
  const at = tellerOf(page, fact, reading)
  const facts = at === null ? null : reading.valueAt(at)?.[loreFacts.propertySlug]
  if (!Array.isArray(facts)) return null
  for (const one of facts) {
    if (typeof one !== "object" || one === null || Reflect.get(one, FACT) !== fact) continue
    return stringsIn(Reflect.get(one, loreKnowers.propertySlug))
  }
  return null
}

function settledAlready(reading: Reading, one: Memory): boolean {
  const knowers = knowersOf(reading, one.page, one.fact)
  if (one.establishes === true) return knowers !== null
  return one.learns !== undefined && (knowers?.includes(one.learns) ?? false)
}

function knowersNamed(memory: readonly Memory[], one: Memory): readonly string[] {
  if (one.establishes !== true) return one.learns === undefined ? [] : [one.learns]
  const same = memory.filter(
    (each) => each.page === one.page && each.fact === one.fact && each.shown !== true
  )
  return [...new Set(same.flatMap((each) => (each.learns === undefined ? [] : [each.learns])))]
}

export function memoryTold(memory: readonly Memory[], base: Reading): readonly Asking[] | Refused {
  const over: Over = { texts: new Map(), listed: new Map() }
  const asking: Asking[] = []
  const opened = new Map<string, number>()
  for (const [index, one] of memory.entries()) {
    const reading = overlaid(base, over)
    if (one.shown === true || settledAlready(reading, one)) continue
    const knowers = knowersNamed(memory, one)
    const adds = one.establishes === true
    const asked = askedFor(
      { page: one.page, fact: one.fact, knowers, adds, drafts: false },
      reading
    )
    if (typeof asked === "string") {
      return { refused: `memory ${index + 1}, on beat ${one.beat}: ${asked}` }
    }
    for (const each of asked) {
      const at = applied(over, reading, each)
      const made = at === null ? undefined : opened.get(at)
      if (at !== null && made !== undefined) {
        asking[made] = { at: ADD_FILE, given: { at, body: over.texts.get(at) ?? "" } }
        continue
      }
      if (at !== null && each.at === ADD_FILE) opened.set(at, asking.length)
      asking.push(each)
    }
  }
  return asking
}

export function memorySettled(
  reading: Reading,
  held: Held,
  handed: Handed,
  status: TurnStep
): readonly Asking[] | Refused {
  if (held.status === BEATS) {
    const beat = handed.kind === "record" ? (handed.memory ?? []) : []
    return beat.length === 0 ? [] : memoryTold(beat, reading)
  }
  const adding = handed.kind === "record" && held.status === RECORDERS
  const more = adding ? (handed.memory ?? []) : []
  const all = [...(held.memory ?? []), ...more].toSorted((one, other) => one.beat - other.beat)
  if (all.length === 0) return []
  if (status === PLAYER) return memoryTold(all, reading)
  if (more.length === 0) return []
  const told = memoryTold(all, reading)
  return "refused" in told ? told : []
}
