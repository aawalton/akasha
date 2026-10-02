import { addPageProperty } from "akasha/change/mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.ts"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changePagePageProperty } from "akasha/change/mechanical/file-content/change/change-page-page-property/change-page-page-property.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { editsIn, foldedIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { dice as diceArgument } from "akasha/command/argument/pages/dice.argument.ts"
import { worldFor } from "akasha/command/modules/change-running/change-running.module.code.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const

const RESTATE = `${changeMechanicalFileContent.slug}/${changePagePageProperty.slug}` as const

const ADD = `${changeMechanicalFileContent.slug}/${addPageProperty.slug}` as const

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const STATED = new RegExp(`^\\s*${ENDS_AT}:`, "m")

const BREAK = "\n"

const ADDED = "added"

const SETTLED = "settled"

const CHARACTER = "character"

const CHECK = "check"

const READING = "reading"

const ANSWERED = "answered"

const DICE = "dice"

const NUMBER = "number"

type Settled = { readonly answered: unknown }

export type Summed = { readonly at: string; readonly key: string; readonly by: number }

export type Added = { readonly page: string; readonly key: string; readonly by: number }

export type Adding = (reading: unknown, answered: unknown) => readonly Added[]

function addedOf(
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

type Answered = { readonly answered: unknown; readonly added: readonly Added[] }

type Settle = (given: unknown, thrown: unknown) => unknown

function settledOrUnrolled(settle: Settle, path: string, reading: unknown, roll: unknown): unknown {
  try {
    return settle(reading, roll)
  } catch (error) {
    if (roll !== null || !(error instanceof TypeError)) throw error
    return {
      refused: `\`${path}\` reads a roll and was handed none, so settle it with \`${diceArgument.said}\``,
    }
  }
}

export async function settledAt(
  path: string,
  reading: unknown,
  roll: unknown
): Promise<{ readonly answered: Answered } | { readonly refused: string }> {
  const held = (await import(path)) as Record<string, unknown>
  const settle = held[SETTLED]
  if (typeof settle !== "function") {
    return { refused: `\`${path}\` exports no \`${SETTLED}\`, so nothing settles the roll` }
  }
  const said = settledOrUnrolled(settle as Settle, path, reading, roll)
  if (!isRecord(said)) return { refused: `\`${path}\` answered no roll` }
  const why = said["refused"]
  if (typeof why === "string") return { refused: why }
  const answered = said["answered"]
  return { answered: { answered, added: addedOf(held, reading, answered) } }
}

export function keptPageOf(root: string, agentId: string | null, page: string): string | null {
  const keeper = agentId === null ? null : agentPathOf(root, agentId)
  if (keeper === null) return null
  const kept = editsIn(root, keeper)
  if ("why" in kept || kept.rows.length === 0) return null
  try {
    return pageIn(worldFor(root, kept.rows, foldedIn(kept.rows)).index, page)
  } catch {
    return null
  }
}

type Made = {
  readonly check: string
  readonly reading: Readonly<Record<string, unknown>>
  readonly dice?: unknown
}

type SettledLine = {
  readonly place: number
  readonly was: Readonly<Record<string, unknown>>
}

function replacingKey(was: unknown): string | null {
  if (!isRecord(was) || typeof was[CHECK] !== "string" || was[DICE] !== undefined) return null
  const read = was[READING]
  if (!isRecord(read)) return null
  return JSON.stringify([was[CHECK], read[CHARACTER] ?? null])
}

function outcomeLines(kept: string): readonly string[] {
  return kept.split(BREAK).filter((one) => one.trim() !== "")
}

export function settledBefore(kept: string | null, roll: Made): SettledLine | null {
  if (kept === null || roll.dice !== undefined) return null
  const key = replacingKey(roll)
  const lines = outcomeLines(kept)
  for (let place = lines.length - 1; place >= 0; place -= 1) {
    const was: unknown = JSON.parse(lines[place] ?? "")
    if (isRecord(was) && replacingKey(was) === key) return { place, was }
  }
  return null
}

export function countedLines(kept: string): readonly string[] {
  const replaced = new Set<string>()
  const counted: string[] = []
  for (const line of outcomeLines(kept).toReversed()) {
    const key = replacingKey(JSON.parse(line))
    if (key !== null && replaced.has(key)) continue
    if (key !== null) replaced.add(key)
    counted.push(line)
  }
  return counted.toReversed()
}

export async function takenBackOf(
  path: string,
  was: Readonly<Record<string, unknown>>
): Promise<readonly Added[]> {
  const adding = await addingAt(path)
  return adding(was[READING], was[ANSWERED]).map((one) => ({ ...one, by: -one.by }))
}

type Unfound = { readonly refused: string; readonly unfound: string }

export function sumsOf(
  added: readonly Added[],
  pageAt: (page: string) => string | null
): readonly Summed[] | Unfound {
  const sums: Summed[] = []
  for (const one of added) {
    const at = pageAt(one.page)
    if (at === null) {
      const refused = `\`${one.page}\`, which the answer adds to, is no page here`
      return { refused, unfound: one.page }
    }
    sums.push({ at, key: one.key, by: one.by })
  }
  return sums
}

export function pageIn(index: Pick<Answering, "listedAt">, page: string): string | null {
  const address = addressIn(page)
  if (address.kind !== "qualified") return null
  return index.listedAt(address.pageTypeSlug, address.slug)[0]?.path ?? null
}

export function keptOnly(page: string, drafting: string): string {
  return `\`${page}\`, which the answer adds to, is a page only in your kept edits, so settle with \`${drafting}\` or land that page first`
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
