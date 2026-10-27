import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { countedPlaces } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { outcomesAt } from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { inventory } from "akasha/story/recorder/pages/inventory.story-recorder.ts"
import { mechanics } from "akasha/story/recorder/pages/mechanics.story-recorder.ts"
import { storyItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.ts"
import { metricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.ts"
import {
  BEATS,
  type Handed,
  type Held,
  MECHANICS,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { changesMerged } from "akasha/story/world/stories/played/turns/modules/turn-mechanics/turn-mechanics.module.code.ts"

const BREAK = "\n"

const ADDED = "added"

const PARTED = "/"

const CARRIED: readonly string[] = [metricCharacterCurrency.slug, storyItem.slug]

export type Owed = {
  readonly line: number
  readonly page: string
  readonly key: string
  readonly by: number
}

function owedOn(line: number, held: unknown): readonly Owed[] {
  if (!isRecord(held) || !Array.isArray(held[ADDED])) return []
  return held[ADDED].flatMap((one): Owed[] => {
    if (!isRecord(one)) return []
    const { page, key, by } = one
    if (typeof page !== "string" || typeof key !== "string" || typeof by !== "number") return []
    return [{ line, page, key, by }]
  })
}

export function owedIn(text: string): readonly Owed[] {
  const lines = text.split(BREAK).filter((one) => one.trim() !== "")
  return countedPlaces(text).flatMap((at) => owedOn(at + 1, JSON.parse(lines[at] ?? "null")))
}

export function recorderOf(page: string): string {
  const type = page.slice(0, page.indexOf(PARTED))
  return CARRIED.includes(type) ? inventory.slug : mechanics.slug
}

function markedBy(owed: Owed, changes: readonly BeatChange[]): number {
  let sum = 0
  for (const one of changes) {
    if (one.outcome !== owed.line || one.page !== owed.page || one.key !== owed.key) continue
    if (typeof one.to === "number" && typeof one.from === "number") sum += one.to - one.from
  }
  return sum
}

export function marksRefused(owed: readonly Owed[], changes: readonly BeatChange[]): string | null {
  const unmet = owed.flatMap((one) => {
    const marked = markedBy(one, changes)
    if (marked === one.by) return []
    return [
      `outcome line ${one.line} adds ${one.by} to \`${one.key}\` of \`${one.page}\`, and the changes marked \`"outcome":${one.line}\` there add ${marked}`,
    ]
  })
  if (unmet.length === 0) return null
  return `${unmet.join("; ")}; state each on the beat that tells it, or on this beat where that one is shown`
}

export function unmarkedIn(owed: readonly Owed[], changes: readonly BeatChange[]): string | null {
  const lines = new Map<string, number[]>()
  for (const one of owed) {
    const named = `${one.page}${BREAK}${one.key}`
    lines.set(named, [...(lines.get(named) ?? []), one.line])
  }
  for (const one of changes) {
    if (one.key === undefined || one.to === undefined) continue
    const owing = lines.get(`${one.page}${BREAK}${one.key}`)
    if (owing === undefined) continue
    if (one.outcome !== undefined && owing.includes(one.outcome)) continue
    return `the change on beat ${one.beat} sets \`${one.key}\` of \`${one.page}\`, which outcome line ${owing.join(", ")} adds to, and names none of them as its \`"outcome"\`; mark each change stating an add with that add's line`
  }
  return null
}

function lastHanding(held: Held, handed: Handed): boolean {
  if (handed.kind !== "record") return false
  if (held.status === MECHANICS) return true
  return handed.beat !== undefined && handed.beat === held.beats
}

export function marksOn(
  textOf: (path: string) => string | null,
  turnAt: string,
  held: Held,
  handed: Handed
): string | null {
  if (handed.kind !== "record") return null
  if (held.status !== MECHANICS && held.status !== BEATS) return null
  if (handed.recorder !== mechanics.slug && handed.recorder !== inventory.slug) return null
  const at = outcomesAt(turnAt)
  const text = at === null ? null : textOf(at)
  if (text === null) return null
  const owed = owedIn(text)
  const mine = (one: Owed) => recorderOf(one.page) === handed.recorder
  const own = held.status === BEATS ? owed : owed.filter(mine)
  const unmarked = unmarkedIn(own, handed.changes ?? [])
  if (unmarked !== null || !lastHanding(held, handed)) return unmarked
  return marksRefused(own, changesMerged(held.changes ?? [], handed.changes ?? []))
}
