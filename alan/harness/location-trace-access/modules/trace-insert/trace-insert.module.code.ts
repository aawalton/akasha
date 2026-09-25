import { randomUUID } from "node:crypto"
import { getEsoDayStrAt } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import type { LocationTraceInsert } from "akasha/alan/harness/location-trace-access/modules/trace-shape/trace-shape.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { entryRowsIn } from "akasha/page/property-entry/modules/entry-rows/entry-rows.module.code.ts"
import {
  readingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

const WRITER = "Location traces <location-traces@alanwalton.com>"

const TRACE_ROWS_KEY = "location-traces"

const DAYS_KEPT_IN = "alan/track/daily/day/pages"

const DAY_SLUG_PREFIX = "day-"

const ANCHOR_PAGE_TYPE = "day"

const HELD = "jsonl"

export const TRIES = 5

export type ReadingFor = typeof readingFor

export type WritingFor = typeof writingFor

type Held = readonly (readonly [string, LocationTraceInsert])[]

interface Merged {
  readonly lines: readonly string[]
  readonly inserted: number
  readonly touched: boolean
}

interface TraceNamed {
  readonly deviceId: string
  readonly clientSeq: number
  readonly capturedAt: string
}

function instantMs(iso: string): number {
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) {
    throw new Error(`location-traces: unparseable instant ${JSON.stringify(iso)}`)
  }
  return ms
}

export function traceIdentity(named: TraceNamed): string {
  return JSON.stringify([named.deviceId, named.clientSeq, instantMs(named.capturedAt)])
}

export function traceRowsIn(day: string): string {
  const page = `${DAYS_KEPT_IN}/${day}/${DAY_SLUG_PREFIX}${day}.${ANCHOR_PAGE_TYPE}.ts`
  const beside = besideAt(page, TRACE_ROWS_KEY, HELD)
  if (beside === null) {
    throw new Error(`traceRowsIn: ${page} is no page a row can sit beside`)
  }
  return beside
}

const TRACE_ROW = z.record(z.string(), z.unknown())

function identityOf(values: Value): string {
  return traceIdentity({
    deviceId: textAt(values, "deviceId") ?? "",
    clientSeq: numberAt(values, "clientSeq") ?? Number.NaN,
    capturedAt: textAt(values, "capturedAt") ?? "",
  })
}

function identityIn(line: string, path: string): string | null {
  try {
    const held = TRACE_ROW.safeParse(JSON.parse(line)).data
    if (held === undefined) throw new Error("the line is JSON but no row")
    return identityOf(held)
  } catch (err) {
    console.warn(
      `insertLocationTraces: ${path} carries a line that names no trace, kept as it is — ${String(err)}: ${line}`
    )
    return null
  }
}

function put(row: Record<string, unknown>, key: string, held: unknown): undefined {
  if (held === null || held === undefined) return
  row[key] = held
}

export function rowOf(trace: LocationTraceInsert, id: string): string {
  const row: Record<string, unknown> = {
    id,
    deviceId: trace.deviceId,
    clientSeq: trace.clientSeq,
    capturedAt: trace.capturedAt,
    latitude: trace.latitude,
    longitude: trace.longitude,
  }
  put(row, "accuracyM", trace.accuracyM)
  put(row, "altitudeM", trace.altitudeM)
  put(row, "altitudeAccuracyM", trace.altitudeAccuracyM)
  put(row, "speedMps", trace.speedMps)
  put(row, "headingDeg", trace.headingDeg)
  put(row, "isMoving", trace.isMoving)
  put(row, "activityType", trace.activityType)
  put(row, "batteryLevel", trace.batteryLevel)
  put(row, "batteryIsCharging", trace.batteryIsCharging)
  put(row, "odometerM", trace.odometerM)
  put(row, "source", trace.source)
  return JSON.stringify(row)
}

export function mergedInto(read: readonly string[], held: Held, path: string): Merged {
  const lines = [...read]
  const filed = new Set<string>()
  for (const line of lines) {
    const identity = identityIn(line, path)
    if (identity !== null) filed.add(identity)
  }
  let inserted = 0
  for (const [identity, trace] of held) {
    if (filed.has(identity)) continue
    lines.push(rowOf(trace, randomUUID()))
    filed.add(identity)
    inserted += 1
  }
  return { lines, inserted, touched: inserted > 0 }
}

function messageFor(path: string, inserted: number): string {
  return `${String(inserted)} trace(s) filed in ${path}`
}

async function landDay(
  path: string,
  held: Held,
  reading: ReadingFor = readingFor,
  writing: WritingFor = writingFor
): Promise<number> {
  let why = "nothing was tried"
  for (let taken = 1; taken <= TRIES; taken += 1) {
    const read = await reading({ paths: [path] })
    if ("refused" in read) {
      why = read.refused
      continue
    }
    const body = read.bodies.find((one) => one.path === path)
    const merged = mergedInto(entryRowsIn(body?.content ?? null), held, path)
    if (!merged.touched) return merged.inserted
    const wrote = await writing({
      writer: WRITER,
      message: messageFor(path, merged.inserted),
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
    return merged.inserted
  }
  throw new Error(
    `insertLocationTraces: ${path} was not written in ${String(TRIES)} tries — ${why}. ` +
      "The phone keeps a batch no 200 came back for, so these traces arrive again, and a trace " +
      "already filed is left as it is rather than filed a second time."
  )
}

export async function insertLocationTraces(
  records: readonly LocationTraceInsert[],
  reading: ReadingFor = readingFor,
  writing: WritingFor = writingFor
): Promise<{ inserted: number }> {
  if (records.length === 0) return { inserted: 0 }

  const byIdentity = new Map<string, LocationTraceInsert>()
  for (const trace of records) byIdentity.set(traceIdentity(trace), trace)

  const byDay = new Map<string, [string, LocationTraceInsert][]>()
  for (const [identity, trace] of byIdentity) {
    const day = getEsoDayStrAt(trace.capturedAt)
    const held = byDay.get(day) ?? []
    held.push([identity, trace])
    byDay.set(day, held)
  }

  for (const day of [...byDay.keys()].sort()) {
    await landDay(traceRowsIn(day), byDay.get(day) ?? [], reading, writing)
  }

  return { inserted: records.length }
}
