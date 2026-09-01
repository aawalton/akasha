import { getEsoDayStrAt } from "@akasha/day/eso-day"
import { writePage, writeRows } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import {
  ANCHOR_PAGE_TYPE,
  ROW_CEILING,
  ROW_PAGE_TYPE,
  rowValuesOf,
  traceIdentity,
} from "../trace-rows/trace-rows.module.code.ts"
import type { LocationTraceInsert } from "../trace-shape/trace-shape.module.code.ts"

const WRITER = "location-traces"

async function keysOn(day: string): Promise<ReadonlySet<string>> {
  const asked = await askComposed({
    "page-type": ROW_PAGE_TYPE,
    where: { [`${ANCHOR_PAGE_TYPE}-slug`]: { is: day } },
    limit: ROW_CEILING,
  })
  if (!asked.ok) throw new Error(`insertLocationTraces: reading ${day}: ${asked.why}`)
  const held = new Set<string>()
  for (const row of asked.answer.rows) {
    const named = row.values["device-id"]
    const deviceId = typeof named === "string" ? named : ""
    const counted = row.values["client-seq"]
    const clientSeq =
      typeof counted === "number"
        ? counted
        : typeof counted === "string"
          ? Number(counted)
          : Number.NaN
    if (deviceId === "" || !Number.isFinite(clientSeq)) continue
    held.add(traceIdentity({ deviceId, clientSeq }))
  }
  return held
}

async function dayPaged(day: string): Promise<boolean> {
  const asked = await askComposed({
    "page-type": ANCHOR_PAGE_TYPE,
    where: { "eso-day": { is: day } },
    limit: 1,
  })
  if (!asked.ok) throw new Error(`insertLocationTraces: looking for ${day}: ${asked.why}`)
  return asked.answer.rows.length > 0
}

export async function insertLocationTraces(
  records: readonly LocationTraceInsert[]
): Promise<{ inserted: number }> {
  if (records.length === 0) return { inserted: 0 }

  const byIdentity = new Map<string, LocationTraceInsert>()
  for (const record of records) byIdentity.set(traceIdentity(record), record)

  const byDay = new Map<string, [string, LocationTraceInsert][]>()
  for (const pair of byIdentity) {
    const day = getEsoDayStrAt(pair[1].capturedAt)
    const held = byDay.get(day) ?? []
    held.push(pair)
    byDay.set(day, held)
  }

  let inserted = 0

  for (const day of [...byDay.keys()].sort()) {
    const held = byDay.get(day) ?? []
    const keys = await keysOn(day)
    const rows = held
      .filter(([identity]) => !keys.has(identity))
      .map(([, record]) => rowValuesOf(record, Bun.randomUUIDv7()))
    if (rows.length === 0) continue
    if (!(await dayPaged(day))) {
      const page = await writePage(ANCHOR_PAGE_TYPE, day, { "eso-day": day }, WRITER)
      if (!page.ok) throw new Error(`insertLocationTraces: the day ${day}: ${page.why}`)
    }
    const landed = await writeRows(ANCHOR_PAGE_TYPE, day, rows, WRITER)
    if (!landed.ok) throw new Error(`insertLocationTraces: rows on ${day}: ${landed.why}`)
    inserted += rows.length
  }

  return { inserted }
}
