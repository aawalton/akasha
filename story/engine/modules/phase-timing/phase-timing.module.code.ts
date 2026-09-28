import { readFileSync } from "node:fs"
import { join } from "node:path"
import { recorded } from "akasha/check/modules/cost/check-cost.module.code.ts"
import {
  type Chosen,
  meanOf,
  midOf,
  mostOf,
  partsIn,
  secondsAs,
} from "akasha/check/modules/measuring/check-measuring.module.code.ts"
import { columnsOf } from "akasha/command/pages/measure/modules/checkout-counting/checkout-counting.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { phaseTimings } from "akasha/story/properties/phase-timings.file-property.ts"
import { z } from "zod"

const ENTRIES = phaseTimings.propertySlug

export const PLAYER = "player"

const USER = "user"

const STAMP_DIGITS = 12

const HEX = 16

const A_THOUSAND = 1000

const ABSENT = "-"

const WHOLE = "whole"

const INDENT = "  "

const HEADED: readonly string[] = [
  "count",
  "wall mid",
  "wall avg",
  "wall max",
  "wait mid",
  "work mid",
]

export const PHASE_ROW = z.looseObject({
  runId: z.string(),
  ranAt: z.string(),
  endedAt: z.string(),
  phase: z.string(),
  ran: z.string(),
  story: z.string(),
  wallMs: z.number(),
  waitMs: z.number().optional(),
  workMs: z.number().optional(),
})

export type PhaseRow = z.infer<typeof PHASE_ROW>

const TRANSCRIPT_LINE = z.looseObject({ type: z.string(), timestamp: z.string() })

export type Ended = {
  readonly story: string
  readonly run: string
  readonly madeAt: number | null
  readonly phase: string
  readonly seat: string
  readonly endedAt: number
}

function msOf(said: string): number {
  return Date.parse(said)
}

function isoOf(ms: number): string {
  return new Date(ms).toISOString()
}

export function madeAtOf(id: unknown): number | null {
  if (typeof id !== "string") return null
  const stamp = Number.parseInt(id.replaceAll("-", "").slice(0, STAMP_DIGITS), HEX)
  return Number.isFinite(stamp) ? stamp : null
}

export function startedAtOf(
  rows: readonly PhaseRow[],
  run: string,
  phase: string,
  madeAt: number | null
): number | null {
  let found: number | null = null
  for (const one of rows) {
    if (one.runId !== run || one.phase === phase || one.phase === PLAYER) continue
    const ended = msOf(one.endedAt)
    if (found === null || ended > found) found = ended
  }
  return found ?? madeAt
}

export function rowOf(ended: Ended, from: number, pickedUp: number | null): PhaseRow {
  const to = ended.endedAt
  const held = pickedUp !== null && pickedUp >= from && pickedUp <= to
  return {
    runId: ended.run,
    ranAt: isoOf(from),
    endedAt: isoOf(to),
    phase: ended.phase,
    ran: ended.seat,
    story: ended.story,
    wallMs: to - from,
    ...(held ? { waitMs: pickedUp - from, workMs: to - pickedUp } : {}),
  }
}

export function playerRowOf(rows: readonly PhaseRow[], ended: Ended): PhaseRow | null {
  const made = ended.madeAt
  if (made === null || rows.some((one) => one.runId === ended.run)) return null
  let last: PhaseRow | null = null
  for (const one of rows) {
    if (one.phase === PLAYER) continue
    if (last === null || msOf(one.endedAt) > msOf(last.endedAt)) last = one
  }
  if (last === null) return null
  const from = msOf(last.endedAt)
  if (!(from <= made)) return null
  const player = { ...ended, run: last.runId, phase: PLAYER, seat: PLAYER, endedAt: made }
  return rowOf(player, from, null)
}

function transcriptLineIn(line: string): z.infer<typeof TRANSCRIPT_LINE> | null {
  try {
    const said = TRANSCRIPT_LINE.safeParse(JSON.parse(line))
    return said.success ? said.data : null
  } catch {
    return null
  }
}

export function pickedUpIn(text: string | null, run: string, from: number): number | null {
  if (text === null) return null
  let found: number | null = null
  for (const line of text.split("\n")) {
    if (!line.includes(run)) continue
    const said = transcriptLineIn(line)
    if (said === null || said.type !== USER) continue
    const at = msOf(said.timestamp)
    if (at >= from && (found === null || at < found)) found = at
  }
  return found
}

function rowIn(line: string): PhaseRow | null {
  try {
    const said = PHASE_ROW.safeParse(JSON.parse(line))
    return said.success ? said.data : null
  } catch {
    return null
  }
}

export function rowsAt(root: string, page: string): readonly PhaseRow[] {
  const found: PhaseRow[] = []
  for (const at of partsIn(root, page, ENTRIES)) {
    for (const line of readFileSync(join(root, at), "utf8").split("\n")) {
      const one = line.trim() === "" ? null : rowIn(line)
      if (one !== null) found.push(one)
    }
  }
  return found
}

export function phaseEnded(
  root: string,
  page: string,
  ended: Ended,
  since: (from: number) => string | null
): readonly PhaseRow[] {
  const rows = rowsAt(root, page)
  const written: PhaseRow[] = []
  const player = playerRowOf(rows, ended)
  if (player !== null) written.push(player)
  const from = startedAtOf(rows, ended.run, ended.phase, ended.madeAt)
  if (from !== null && from <= ended.endedAt) {
    written.push(rowOf(ended, from, pickedUpIn(since(from), ended.run, from)))
  }
  for (const one of written) recorded(root, page, `${JSON.stringify(one)}\n`, ENTRIES)
  return written
}

export function phaseRowsIn(root: string, pageTypes: readonly string[]): readonly PhaseRow[] {
  return pageTypes.flatMap((type) =>
    everyOfType(root, type).flatMap((one) => rowsAt(root, one.path))
  )
}

function runOf(one: PhaseRow): string {
  return `${one.story}/${one.runId}`
}

export function chosenOf(
  rows: readonly PhaseRow[],
  now: number,
  chosen: Chosen
): readonly PhaseRow[] {
  if (chosen.by === "period") {
    return rows.filter((one) => msOf(one.ranAt) >= now - chosen.ms && msOf(one.ranAt) <= now)
  }
  const latest = new Map<string, number>()
  for (const one of rows) {
    latest.set(runOf(one), Math.max(latest.get(runOf(one)) ?? 0, msOf(one.endedAt)))
  }
  const ranked = [...latest].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  const kept = new Set(ranked.slice(0, chosen.runs).map(([run]) => run))
  return rows.filter((one) => kept.has(runOf(one)))
}

function secondsOf(found: readonly number[], how: (some: readonly number[]) => number | null) {
  const said = how(found.map((one) => one / A_THOUSAND))
  return said === null ? ABSENT : secondsAs(said)
}

function lineOf(named: string, walls: readonly number[], rows: readonly PhaseRow[]): string[] {
  const waits = rows.flatMap((one) => (one.waitMs === undefined ? [] : [one.waitMs]))
  const works = rows.flatMap((one) => (one.workMs === undefined ? [] : [one.workMs]))
  return [
    named,
    String(walls.length),
    secondsOf(walls, midOf),
    secondsOf(walls, meanOf),
    secondsOf(walls, mostOf),
    secondsOf(waits, midOf),
    secondsOf(works, midOf),
  ]
}

function grouped<Key>(rows: readonly PhaseRow[], by: (one: PhaseRow) => Key) {
  const found = new Map<Key, PhaseRow[]>()
  for (const one of rows) {
    const had = found.get(by(one))
    if (had === undefined) found.set(by(one), [one])
    else had.push(one)
  }
  return found
}

function firstsOf(rows: readonly PhaseRow[]): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const one of rows) {
    if (one.phase === PLAYER) continue
    const at = msOf(one.ranAt)
    found.set(runOf(one), Math.min(found.get(runOf(one)) ?? at, at))
  }
  return found
}

export function wholesOf(rows: readonly PhaseRow[]): readonly number[] {
  const played = rows.filter((one) => one.phase !== PLAYER)
  return [...grouped(played, runOf).values()].map(
    (some) =>
      Math.max(...some.map((one) => msOf(one.endedAt))) -
      Math.min(...some.map((one) => msOf(one.ranAt)))
  )
}

export function phasesOrdered(rows: readonly PhaseRow[]): readonly string[] {
  const firsts = firstsOf(rows)
  const offsets = [...grouped(rows, (one) => one.phase)].map(([phase, some]) => {
    const each = some.map((one) => msOf(one.ranAt) - (firsts.get(runOf(one)) ?? msOf(one.ranAt)))
    return [phase, meanOf(each) ?? 0] as const
  })
  return offsets.sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0])).map(([phase]) => phase)
}

export function linesOf(rows: readonly PhaseRow[]): readonly string[] {
  const drawn: (readonly string[])[] = [["story", ...HEADED]]
  const stories = [...grouped(rows, (one) => one.story)].sort((a, b) => a[0].localeCompare(b[0]))
  for (const [story, some] of stories) {
    drawn.push([story])
    const phases = grouped(some, (one) => one.phase)
    for (const phase of phasesOrdered(some)) {
      const held = phases.get(phase) ?? []
      drawn.push(
        lineOf(
          `${INDENT}${phase}`,
          held.map((one) => one.wallMs),
          held
        )
      )
    }
    drawn.push(lineOf(`${INDENT}${WHOLE}`, wholesOf(some), []))
  }
  return columnsOf(drawn)
}
