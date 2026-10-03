import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import type { Turn } from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import { askedFor, type Reading } from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { beatMemory } from "akasha/story/chapter/properties/beat-memory.file-property.ts"
import {
  type Memory,
  memoryIn,
} from "akasha/story/engine/beat-state/modules/beat-memory/beat-memory.module.code.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import {
  type Handed,
  type Held,
  linesIn,
  PLAYER,
  RECORDERS,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const MEMORY = exportedAs(beatMemory.propertySlug)

const FACT = "fact"

const QUALIFIED = "qualified"

const AT = "at"

const OLD = "old"

const NEW = "new"

const BODY = "body"

type Refused = { readonly refused: string }

type Over = Map<string, string | null>

export function memoryHeld(turn: Turn, textOf: (path: string) => string): readonly Memory[] {
  const ending = turn.value[MEMORY]
  if (typeof ending !== "string") return []
  const at = besideAt(turn.at, beatMemory.propertySlug, ending)
  if (at === null) return []
  try {
    const read = memoryIn(linesIn(textOf(at)), Number.MAX_SAFE_INTEGER)
    return "refused" in read ? [] : read
  } catch {
    return []
  }
}

function overlaid(base: Reading, over: Over): Reading {
  return {
    ...base,
    textOf: (path) => (over.has(path) ? (over.get(path) ?? null) : base.textOf(path)),
    valueAt: (path) => {
      if (!over.has(path)) return base.valueAt(path)
      const text = over.get(path)
      return text === null || text === undefined ? null : valueIn(text)
    },
  }
}

function applied(over: Over, reading: Reading, asked: readonly Asking[]): undefined {
  for (const one of asked) {
    const given: Readonly<{ [key: string]: unknown }> = one.given
    const at = given[AT]
    if (typeof at !== "string") continue
    const old = given[OLD]
    const now = given[NEW]
    const body = given[BODY]
    if (typeof old === "string" && typeof now === "string") {
      over.set(at, (reading.textOf(at) ?? "").replace(old, now))
    } else if (typeof body === "string") {
      over.set(at, body)
    } else {
      over.set(at, null)
    }
  }
  return undefined
}

function knowersOf(reading: Reading, page: string, fact: string): readonly string[] | null {
  const address = addressIn(page)
  if (address.kind !== QUALIFIED) return null
  const at = reading.listedAt(address.pageTypeSlug, address.slug)[0]?.path
  const facts = at === undefined ? null : reading.valueAt(at)?.[loreFacts.propertySlug]
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

export function memoryTold(memory: readonly Memory[], base: Reading): readonly Asking[] | Refused {
  const over: Over = new Map()
  const asking: Asking[] = []
  for (const [index, one] of memory.entries()) {
    const reading = overlaid(base, over)
    if (one.shown === true || settledAlready(reading, one)) continue
    const knowers = one.learns === undefined ? [] : [one.learns]
    const adds = one.establishes === true
    const asked = askedFor(
      { page: one.page, fact: one.fact, knowers, adds, drafts: false },
      reading
    )
    if (typeof asked === "string") {
      return { refused: `memory ${index + 1}, on beat ${one.beat}: ${asked}` }
    }
    applied(over, reading, asked)
    asking.push(...asked)
  }
  return asking
}

export function memorySettled(
  reading: Reading,
  held: Held,
  handed: Handed,
  status: TurnStep
): readonly Asking[] | Refused {
  const adding = handed.kind === "record" && held.status === RECORDERS
  const more = adding ? (handed.memory ?? []) : []
  const all = [...(held.memory ?? []), ...more].toSorted((one, other) => one.beat - other.beat)
  if (all.length === 0) return []
  if (status === PLAYER) return memoryTold(all, reading)
  if (more.length === 0) return []
  const told = memoryTold(all, reading)
  return "refused" in told ? told : []
}
