import { askComposed } from "@shared/pages-query/ask"
import { writePage, writeRows } from "@shared/pages-query"
import { sampleIdentity } from "./identity"
import { ANCHOR_PAGE_TYPE, esoDayOfSample, numberAt, ROW_CEILING, textAt } from "./rows"
import type { HealthSample, HealthSampleWriteReport } from "./types"

const WRITER = "health-samples"

const EMPTY_REPORT: HealthSampleWriteReport = {
  received: 0,
  distinct: 0,
  inserted: 0,
  unchanged: 0,
  valueChanged: 0,
}

interface Standing {
  readonly id: string
  readonly value: number
  readonly arrivedAt: string
}

async function standingOn(day: string): Promise<ReadonlyMap<string, Standing>> {
  const asked = await askComposed({
    "page-type": "health-sample",
    where: { [`${ANCHOR_PAGE_TYPE}-slug`]: { is: day } },
    limit: ROW_CEILING,
  })
  if (!asked.ok) throw new Error(`upsertHealthSamples: reading ${day}: ${asked.why}`)
  const held = new Map<string, Standing>()
  for (const row of asked.answer.rows) {
    const id = textAt(row.values, "id")
    if (id === "") continue
    held.set(
      sampleIdentity({
        metric: textAt(row.values, "metric"),
        sourceName: textAt(row.values, "source-name"),
        startedAt: textAt(row.values, "started-at"),
        endedAt: textAt(row.values, "ended-at"),
      }),
      { id, value: numberAt(row.values, "value"), arrivedAt: textAt(row.values, "arrived-at") }
    )
  }
  return held
}

async function dayStands(day: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": ANCHOR_PAGE_TYPE,
    where: { "eso-day": { is: day } },
    limit: 1,
  })
  if (!asked.ok) throw new Error(`upsertHealthSamples: looking for ${day}: ${asked.why}`)
  return asked.answer.rows.length > 0
}

export async function upsertHealthSamples(args: {
  readonly samples: readonly HealthSample[]
}): Promise<HealthSampleWriteReport> {
  if (args.samples.length === 0) return EMPTY_REPORT

  const byIdentity = new Map<string, HealthSample>()
  for (const sample of args.samples) byIdentity.set(sampleIdentity(sample), sample)

  const byDay = new Map<string, [string, HealthSample][]>()
  for (const pair of byIdentity) {
    const day = esoDayOfSample(pair[1].startedAt)
    const held = byDay.get(day) ?? []
    held.push(pair)
    byDay.set(day, held)
  }

  const now = new Date().toISOString()
  let inserted = 0
  let unchanged = 0
  let valueChanged = 0

  for (const day of [...byDay.keys()].sort()) {
    const held = byDay.get(day) ?? []
    const standing = await standingOn(day)
    const rows = held.map(([identity, sample]) => {
      const prior = standing.get(identity)
      if (prior === undefined) inserted += 1
      else if (prior.value === sample.value) unchanged += 1
      else valueChanged += 1
      return {
        id: prior?.id ?? Bun.randomUUIDv7(),
        metric: sample.metric,
        "started-at": sample.startedAt,
        "ended-at": sample.endedAt,
        value: sample.value,
        unit: sample.unit,
        "source-name": sample.sourceName,
        "arrived-at": prior === undefined || prior.arrivedAt === "" ? now : prior.arrivedAt,
      }
    })
    if (!(await dayStands(day))) {
      const page = await writePage(ANCHOR_PAGE_TYPE, day, { "eso-day": day }, WRITER)
      if (!page.ok) throw new Error(`upsertHealthSamples: the day ${day}: ${page.why}`)
    }
    const landed = await writeRows(ANCHOR_PAGE_TYPE, day, rows, WRITER)
    if (!landed.ok) throw new Error(`upsertHealthSamples: rows on ${day}: ${landed.why}`)
  }

  return {
    received: args.samples.length,
    distinct: byIdentity.size,
    inserted,
    unchanged,
    valueChanged,
  }
}
