import { addPageProperty } from "akasha/change/mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.ts"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"

import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const RESTATE = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const ADD = `${changeMechanicalFileContent.slug}/${addPageProperty.slug}` as const

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const STATED = new RegExp(`^\\s*${ENDS_AT}:`, "m")

const BREAK = "\n"

const ADDED = "added"

const CHARACTER = "character"

const CHECK = "check"

const READING = "reading"

const DICE = "dice"

const NUMBER = "number"

export type Settled = { readonly answered: unknown }

export type Summed = { readonly at: string; readonly key: string; readonly by: number }

export type Added = { readonly page: string; readonly key: string; readonly by: number }

export type Adding = (reading: unknown, answered: unknown) => readonly Added[]

export function addedOf(
  held: Record<string, unknown>,
  reading: unknown,
  answered: unknown
): readonly Added[] {
  const adding = held[ADDED]
  return typeof adding === "function" ? (adding as Adding)(reading, answered) : []
}

export async function addingAt(path: string): Promise<Adding> {
  const held = (await import(path)) as Record<string, unknown>
  return (reading, answered) => addedOf(held, reading, answered)
}

type Made = {
  readonly check: string
  readonly reading: Readonly<Record<string, unknown>>
  readonly dice?: unknown
}

export function settledBefore(kept: string | null, roll: Made): boolean {
  if (kept === null || roll.dice !== undefined) return false
  const whose = roll.reading[CHARACTER]
  return kept
    .split(BREAK)
    .filter((one) => one.trim() !== "")
    .some((one) => {
      const was: unknown = JSON.parse(one)
      if (!isRecord(was) || was[CHECK] !== roll.check || was[DICE] !== undefined) return false
      const read = was[READING]
      return isRecord(read) && read[CHARACTER] === whose
    })
}

export function sumsOf(
  added: readonly Added[],
  pageAt: (page: string) => string | null
): readonly Summed[] | { readonly refused: string } {
  const sums: Summed[] = []
  for (const one of added) {
    const at = pageAt(one.page)
    if (at === null)
      return { refused: `\`${one.page}\`, which the answer adds to, is no page here` }
    sums.push({ at, key: one.key, by: one.by })
  }
  return sums
}

function numberIn(text: string, key: string): number | null {
  const held = new RegExp(`^\\s*${key}:\\s*(-?\\d+(?:\\.\\d+)?)\\s*,?\\s*$`, "m").exec(text)
  return held?.[1] === undefined ? null : Number(held[1])
}

export function summedFor(
  sums: readonly Summed[],
  textOf: (path: string) => string | null
): readonly Asking[] {
  const totals = new Map<string, Summed>()
  for (const one of sums) {
    const named = `${one.at}${BREAK}${one.key}`
    totals.set(named, { ...one, by: (totals.get(named)?.by ?? 0) + one.by })
  }
  const asked: Asking[] = []
  for (const one of totals.values()) {
    if (one.by === 0) continue
    const was = numberIn(textOf(one.at) ?? "", one.key)
    if (was === null) {
      asked.push({ at: ADD, given: { at: one.at, key: one.key, value: String(one.by) } })
      continue
    }
    const to = String(was + one.by)
    asked.push({ at: RESTATE, given: { at: one.at, key: one.key, to, holds: NUMBER } })
  }
  return asked
}

function timedFor(turn: string, endsAt: string, turnText: string | null): readonly Asking[] {
  if (turnText === null || turnText.includes(`${ENDS_AT}: ${JSON.stringify(endsAt)}`)) return []
  if (STATED.test(turnText)) return [{ at: RESTATE, given: { at: turn, key: ENDS_AT, to: endsAt } }]
  return [{ at: ADD, given: { at: turn, key: ENDS_AT, value: JSON.stringify(endsAt) } }]
}

export function askedFor(
  outcomes: string,
  turn: string,
  roll: Settled,
  turnText: string | null
): readonly Asking[] {
  const content = `${JSON.stringify(roll)}${BREAK}`
  const appended: Asking = { at: APPEND, given: { at: outcomes, content } }
  const endsAt = isRecord(roll.answered) ? roll.answered[ENDS_AT] : undefined
  if (typeof endsAt !== "string") return [appended]
  return [appended, ...timedFor(turn, endsAt, turnText)]
}
