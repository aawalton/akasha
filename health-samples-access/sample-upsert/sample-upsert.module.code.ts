import { randomUUID } from "node:crypto"
import { getEsoDayStrAt } from "@akasha/day/eso-day"
import { readingFor, writingFor } from "@akasha/pages-system-service/calling"
import { sampleIdentity } from "../sample-identity/sample-identity.module.code.ts"
import { numberAt, textAt } from "../sample-rows/sample-rows.module.code.ts"
import { sampleRowsIn } from "../sample-selecting/sample-selecting.module.code.ts"
import type {
  HealthSample,
  HealthSampleWriteReport,
} from "../sample-shape/sample-shape.module.code.ts"

const EMPTY_REPORT: HealthSampleWriteReport = {
  received: 0,
  distinct: 0,
  inserted: 0,
  unchanged: 0,
  valueChanged: 0,
}

export const WRITER = "Health samples <health-samples@alanwalton.com>"

export const TRIES = 5

interface Filed {
  readonly at: number
  readonly id: string
  readonly seq: number
  readonly value: number
}

interface DayTally {
  readonly inserted: number
  readonly unchanged: number
  readonly valueChanged: number
}

interface Merged {
  readonly lines: readonly string[]
  readonly tally: DayTally
  readonly touched: boolean
}

type Held = readonly (readonly [string, HealthSample])[]

export type ReadingFor = typeof readingFor

export type WritingFor = typeof writingFor

function linesIn(content: string | null): readonly string[] {
  if (content === null) return []
  return content.split("\n").filter((one) => one.trim() !== "")
}

function valuesOf(line: string, path: string): Readonly<Record<string, unknown>> {
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    throw new Error(`upsertHealthSamples: ${path} carries a line that is not JSON`)
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) {
    throw new Error(`upsertHealthSamples: ${path} carries a line that is not a row`)
  }
  return held as Readonly<Record<string, unknown>>
}

function identityOf(values: Readonly<Record<string, unknown>>): string {
  return sampleIdentity({
    metric: textAt(values, "metric"),
    sourceName: textAt(values, "sourceName"),
    startedAt: textAt(values, "startedAt"),
    endedAt: textAt(values, "endedAt"),
  })
}

function lineOf(sample: HealthSample, id: string, seq: number, arrivedAt: string): string {
  return JSON.stringify({
    id,
    seq,
    metric: sample.metric,
    startedAt: sample.startedAt,
    endedAt: sample.endedAt,
    value: sample.value,
    unit: sample.unit,
    sourceName: sample.sourceName,
    arrivedAt,
  })
}

function filedIn(lines: readonly string[], path: string): ReadonlyMap<string, Filed> {
  const held = new Map<string, Filed>()
  for (let at = 0; at < lines.length; at += 1) {
    const values = valuesOf(lines[at] as string, path)
    const seq = numberAt(values, "seq")
    held.set(identityOf(values), {
      at,
      id: textAt(values, "id"),
      seq: Number.isFinite(seq) ? seq : 0,
      value: numberAt(values, "value"),
    })
  }
  return held
}

export function mergedInto(
  read: readonly string[],
  held: Held,
  arrivedAt: string,
  path: string
): Merged {
  const lines = [...read]
  const filed = filedIn(lines, path)
  let highest = 0
  for (const one of filed.values()) if (one.seq > highest) highest = one.seq
  let inserted = 0
  let unchanged = 0
  let valueChanged = 0
  let touched = false
  for (const [identity, sample] of held) {
    const prior = filed.get(identity)
    if (prior === undefined) {
      highest += 1
      lines.push(lineOf(sample, randomUUID(), highest, arrivedAt))
      inserted += 1
      touched = true
      continue
    }
    if (prior.value === sample.value) {
      unchanged += 1
      continue
    }
    lines[prior.at] = lineOf(sample, prior.id, prior.seq, arrivedAt)
    valueChanged += 1
    touched = true
  }
  return { lines, tally: { inserted, unchanged, valueChanged }, touched }
}

function messageFor(path: string, tally: DayTally): string {
  return `${String(tally.inserted)} reading(s) filed and ${String(tally.valueChanged)} corrected in ${path}`
}

export async function landDay(
  path: string,
  held: Held,
  arrivedAt: string,
  reading: ReadingFor = readingFor,
  writing: WritingFor = writingFor
): Promise<DayTally> {
  let why = "nothing was tried"
  for (let taken = 1; taken <= TRIES; taken += 1) {
    const read = await reading({ paths: [path] })
    if ("refused" in read) {
      why = read.refused
      continue
    }
    const body = read.bodies.find((one) => one.path === path)
    const merged = mergedInto(linesIn(body?.content ?? null), held, arrivedAt, path)
    if (!merged.touched) return merged.tally
    const wrote = await writing({
      writer: WRITER,
      message: messageFor(path, merged.tally),
      puts: [{ path, content: `${merged.lines.join("\n")}\n` }],
      read: read.at,
    })
    if ("refused" in wrote) {
      why = wrote.refused
      continue
    }
    if (wrote.commit === null) {
      why = `the pages named no commit for ${path}, and a change was meant`
      continue
    }
    return merged.tally
  }
  throw new Error(
    `upsertHealthSamples: ${path} was not written in ${String(TRIES)} tries — ${why}. ` +
      "Nothing was committed, so the device keeps its anchor and these readings arrive again."
  )
}

export async function upsertHealthSamples(args: {
  readonly samples: readonly HealthSample[]
  readonly arrivedAt?: string
}): Promise<HealthSampleWriteReport> {
  if (args.samples.length === 0) return EMPTY_REPORT

  const byIdentity = new Map<string, HealthSample>()
  for (const sample of args.samples) byIdentity.set(sampleIdentity(sample), sample)

  const byDay = new Map<string, [string, HealthSample][]>()
  for (const [identity, sample] of byIdentity) {
    const day = getEsoDayStrAt(sample.startedAt)
    const held = byDay.get(day) ?? []
    held.push([identity, sample])
    byDay.set(day, held)
  }

  const arrivedAt = args.arrivedAt ?? new Date().toISOString()
  let inserted = 0
  let unchanged = 0
  let valueChanged = 0

  for (const day of [...byDay.keys()].sort()) {
    const tally = await landDay(sampleRowsIn(day), byDay.get(day) ?? [], arrivedAt)
    inserted += tally.inserted
    unchanged += tally.unchanged
    valueChanged += tally.valueChanged
  }

  return {
    received: args.samples.length,
    distinct: byIdentity.size,
    inserted,
    unchanged,
    valueChanged,
  }
}
