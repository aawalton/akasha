import { randomUUID } from "node:crypto"
import { existsSync, mkdirSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { getEsoDayStrAt } from "@akasha/day/eso-day"
import { exclusively } from "@akasha/file-system/exclusive"
import { canonicalize } from "@akasha/pages-system/repo-path"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"
import { sampleIdentity } from "../sample-identity/sample-identity.module.code.ts"
import { numberAt, textAt } from "../sample-rows/sample-rows.module.code.ts"
import { checkoutRoot, sampleRowsAt } from "../sample-selecting/sample-selecting.module.code.ts"
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

export const KEPT_IN = "HEALTH_SAMPLE_ROWS_KEPT_IN"

export function keptSaid(): string | null {
  const said = process.env[KEPT_IN]
  return said === undefined || said.trim() === "" ? null : said.trim()
}

export function refusalWhereNothingKeeps(root: string, said: string | null): string | null {
  if (said !== null && canonicalize(resolve(said)) === root) return null
  const says =
    said === null
      ? "nothing says which checkout keeps the readings written into it"
      : `\`${KEPT_IN}\` says \`${said}\``
  return (
    `${says}, and this would have written into \`${root}\`. A rows file is tracked, so a ` +
    "checkout restored by `git reset --hard origin/main` throws away what was written into it, " +
    "and answering this write as done would let the device move its anchor past readings " +
    `nothing keeps. Say the checkout whose writes last in \`${KEPT_IN}\`, naming the very ` +
    "checkout written into."
  )
}

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

type Held = readonly (readonly [string, HealthSample])[]

function linesAt(path: string): readonly string[] {
  if (!existsSync(path)) return []
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((one) => one.trim() !== "")
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

function landDay(path: string, held: Held, arrivedAt: string): DayTally {
  mkdirSync(dirname(path), { recursive: true })
  return exclusively(path, () => {
    const lines = [...linesAt(path)]
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
    if (touched) writeFileAtomicSync(path, `${lines.join("\n")}\n`)
    return { inserted, unchanged, valueChanged }
  })
}

export async function upsertHealthSamples(args: {
  readonly samples: readonly HealthSample[]
  readonly arrivedAt?: string
}): Promise<HealthSampleWriteReport> {
  if (args.samples.length === 0) return EMPTY_REPORT

  const root = checkoutRoot()
  const refused = refusalWhereNothingKeeps(root, keptSaid())
  if (refused !== null) {
    throw new Error(
      `upsertHealthSamples: ${args.samples.length} reading(s) were not written — ${refused}`
    )
  }
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
    const tally = landDay(sampleRowsAt(root, day), byDay.get(day) ?? [], arrivedAt)
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
