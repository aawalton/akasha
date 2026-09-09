import { Buffer } from "node:buffer"
import { appendFileSync, existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { uncommittedPartAt } from "@akasha/pages/page-file-parts"
import { sizeOnDisk } from "@akasha/utils/fs/file-size"
import { textOnDisk } from "@akasha/utils/fs/text-on-disk"

const ENTRIES = "entries"

const HELD = "jsonl"

const FIRST_PART = 1

const TICKS_A_SECOND = 100

const A_MILLION = 1_000_000

const KIB = 1024

const CLEAR_REFS = "/proc/self/clear_refs"

const HIWATER_RESET = "5"

const STAT = "/proc/self/stat"

const STATUS = "/proc/self/status"

const IO = "/proc/self/io"

export type Cost = {
  readonly runId: string
  readonly ranAt: string
  readonly phase: string
  readonly ran: string
  readonly wallMs: number
  readonly cpuSeconds: number
  readonly childCpuSeconds: number
  readonly peakBytes: number
  readonly residentBeforeBytes: number
  readonly peakAddedBytes: number
  readonly peakMeasured: boolean
  readonly readCalls: number
  readonly writeCalls: number
  readonly readBytes: number
  readonly pathsChanged: number
  readonly refusals: number
}

export type Taken = {
  readonly cpu: number
  readonly childCpu: number
  readonly peak: number
  readonly resident: number
  readonly readCalls: number
  readonly writeCalls: number
  readonly readBytes: number
  readonly measured: boolean
  readonly at: number
}

export function childSecondsIn(stat: string): number {
  const shut = stat.lastIndexOf(")")
  if (shut < 0) return 0
  const fields = stat.slice(shut + 2).split(" ")
  const user = Number(fields[13] ?? "0")
  const system = Number(fields[14] ?? "0")
  if (!Number.isFinite(user) || !Number.isFinite(system)) return 0
  return (user + system) / TICKS_A_SECOND
}

export function bytesIn(status: string, named: string): number {
  for (const line of status.split("\n")) {
    if (!line.startsWith(`${named}:`)) continue
    const found = /(\d+)/.exec(line)
    return found === null ? 0 : Number(found[1]) * KIB
  }
  return 0
}

function childSeconds(): number {
  const stat = textOnDisk(STAT)
  return stat === null ? 0 : childSecondsIn(stat)
}

function marksNow(): { readonly peak: number; readonly resident: number } {
  const status = textOnDisk(STATUS)
  if (status === null) return { peak: 0, resident: 0 }
  return { peak: bytesIn(status, "VmHWM"), resident: bytesIn(status, "VmRSS") }
}

export function countIn(io: string, named: string): number {
  for (const line of io.split("\n")) {
    if (!line.startsWith(`${named}:`)) continue
    const found = /(\d+)/.exec(line)
    return found === null ? 0 : Number(found[1])
  }
  return 0
}

type Reading = { readonly reads: number; readonly writes: number; readonly bytes: number }

function readingNow(): Reading {
  const io = textOnDisk(IO)
  if (io === null) return { reads: 0, writes: 0, bytes: 0 }
  return { reads: countIn(io, "syscr"), writes: countIn(io, "syscw"), bytes: countIn(io, "rchar") }
}

export function peakForgotten(): boolean {
  try {
    writeFileSync(CLEAR_REFS, HIWATER_RESET)
    return true
  } catch {
    return false
  }
}

export function opening(): Taken {
  const measured = peakForgotten()
  const marks = marksNow()
  const reading = readingNow()
  const used = process.cpuUsage()
  return {
    cpu: (used.user + used.system) / A_MILLION,
    childCpu: childSeconds(),
    peak: marks.peak,
    resident: marks.resident,
    readCalls: reading.reads,
    writeCalls: reading.writes,
    readBytes: reading.bytes,
    measured,
    at: Date.now(),
  }
}

export function closing(): Taken {
  const marks = marksNow()
  const reading = readingNow()
  const used = process.cpuUsage()
  return {
    cpu: (used.user + used.system) / A_MILLION,
    childCpu: childSeconds(),
    peak: marks.peak,
    resident: marks.resident,
    readCalls: reading.reads,
    writeCalls: reading.writes,
    readBytes: reading.bytes,
    measured: true,
    at: Date.now(),
  }
}

export function costOf(
  before: Taken,
  after: Taken,
  runId: string,
  phase: string,
  ran: string,
  pathsChanged: number,
  refusals: number
): Cost {
  return {
    runId,
    ranAt: new Date(before.at).toISOString(),
    phase,
    ran,
    wallMs: after.at - before.at,
    cpuSeconds: Number((after.cpu - before.cpu).toFixed(3)),
    childCpuSeconds: Number((after.childCpu - before.childCpu).toFixed(3)),
    peakBytes: after.peak,
    residentBeforeBytes: before.resident,
    peakAddedBytes: Math.max(after.peak - before.resident, 0),
    peakMeasured: before.measured,
    readCalls: after.readCalls - before.readCalls,
    writeCalls: after.writeCalls - before.writeCalls,
    readBytes: after.readBytes - before.readBytes,
    pathsChanged,
    refusals,
  }
}

export function lineFor(cost: Cost): string {
  return `${JSON.stringify(cost)}\n`
}

function partAt(page: string, part: number): string | null {
  return uncommittedPartAt(page, ENTRIES, HELD, part)
}

export function fillingAt(root: string, page: string, adding: number): string | null {
  let part = FIRST_PART
  let found = partAt(page, part)
  if (found === null) return null
  for (;;) {
    const next = partAt(page, part + 1)
    if (next === null || !existsSync(join(root, next))) break
    part += 1
    found = next
  }
  if (sizeOnDisk(join(root, found)) + adding <= ENTRY_CEILING) return found
  return partAt(page, part + 1) ?? found
}

export function costRecorded(
  root: string,
  page: string,
  before: Taken,
  phase: string,
  ran: string,
  paths: number,
  refusals: number
): string | null {
  return recordCost(
    root,
    page,
    costOf(before, closing(), Bun.randomUUIDv7(), phase, ran, paths, refusals)
  )
}

const NAMES_NO_PAGE = "names no page, so what a run cost is recorded nowhere"

export function recordCost(root: string, page: string, cost: Cost): string | null {
  const line = lineFor(cost)
  const at = fillingAt(root, page, Buffer.byteLength(line, "utf8"))
  if (at === null) return null
  try {
    appendFileSync(join(root, at), line)
    return at
  } catch {
    if (!existsSync(join(root, page))) throw new Error(`\`${page}\` ${NAMES_NO_PAGE}`)
    return null
  }
}
