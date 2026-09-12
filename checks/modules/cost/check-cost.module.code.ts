import { Buffer } from "node:buffer"
import { appendFileSync, existsSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exclusively } from "akasha/files/exclusive/exclusive.module.code.ts"
import { ENTRY_CEILING } from "akasha/pages/entry-ceiling/entry-ceiling.module.code.ts"
import { uncommittedPartAt } from "akasha/pages/file-parts/page-file-parts.module.code.ts"
import { partFiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { sizeOnDisk } from "akasha/utils/fs/file-size/file-size.module.code.ts"
import { textOnDisk } from "akasha/utils/fs/text-on-disk/text-on-disk.module.code.ts"
import { spentRelaying } from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"

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

const PROC = "/proc"

const SELF = "self"

const TASK = "task"

const CHILDREN = "children"

const STAT_LEAF = "stat"

const READINGS_AT_MOST = 3

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

function childSecondsIn(stat: string): number {
  const shut = stat.lastIndexOf(")")
  if (shut < 0) return 0
  const fields = stat.slice(shut + 2).split(" ")
  const user = Number(fields[13] ?? "0")
  const system = Number(fields[14] ?? "0")
  if (!Number.isFinite(user) || !Number.isFinite(system)) return 0
  return (user + system) / TICKS_A_SECOND
}

function bytesIn(status: string, named: string): number {
  for (const line of status.split("\n")) {
    if (!line.startsWith(`${named}:`)) continue
    const found = /(\d+)/.exec(line)
    return found === null ? 0 : Number(found[1]) * KIB
  }
  return 0
}

function ownSecondsIn(stat: string): number {
  const shut = stat.lastIndexOf(")")
  if (shut < 0) return 0
  const fields = stat.slice(shut + 2).split(" ")
  const user = Number(fields[11] ?? "0")
  const system = Number(fields[12] ?? "0")
  if (!Number.isFinite(user) || !Number.isFinite(system)) return 0
  return (user + system) / TICKS_A_SECOND
}

function borneBy(pid: string): readonly string[] {
  let threads: readonly string[]
  try {
    threads = readdirSync(join(PROC, pid, TASK))
  } catch {
    return []
  }
  const held: string[] = []
  for (const thread of threads) {
    const said = textOnDisk(join(PROC, pid, TASK, thread, CHILDREN))
    if (said === null) continue
    for (const one of said.split(" ")) {
      const kept = one.trim()
      if (kept !== "") held.push(kept)
    }
  }
  return held
}

function liveSeconds(): number {
  const waiting = [...borneBy(SELF)]
  let total = 0
  for (;;) {
    const pid = waiting.pop()
    if (pid === undefined) return total
    const stat = textOnDisk(join(PROC, pid, STAT_LEAF))
    if (stat === null) continue
    total += ownSecondsIn(stat)
    waiting.push(...borneBy(pid))
  }
}

function reapedSeconds(): number {
  const stat = textOnDisk(STAT)
  return stat === null ? 0 : childSecondsIn(stat)
}

function childSeconds(): number {
  let readings = 0
  for (;;) {
    readings += 1
    const before = reapedSeconds()
    const live = liveSeconds()
    const after = reapedSeconds()
    if (before === after || readings >= READINGS_AT_MOST) return after + live + spentRelaying()
  }
}

function marksNow(): { readonly peak: number; readonly resident: number } {
  const status = textOnDisk(STATUS)
  if (status === null) return { peak: 0, resident: 0 }
  return { peak: bytesIn(status, "VmHWM"), resident: bytesIn(status, "VmRSS") }
}

function countIn(io: string, named: string): number {
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

function peakForgotten(): boolean {
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

export type Spawned = {
  readonly runId: string
  readonly ranAt: string
  readonly phase: string
  readonly ran: string
  readonly wallMs: number
  readonly cpuSeconds: number
  readonly peakBytes: number
  readonly peakMeasured: boolean
  readonly refusals: number
}

export function costSpawned(given: Spawned): Cost {
  return {
    runId: given.runId,
    ranAt: given.ranAt,
    phase: given.phase,
    ran: given.ran,
    wallMs: given.wallMs,
    cpuSeconds: 0,
    childCpuSeconds: Number(given.cpuSeconds.toFixed(3)),
    peakBytes: given.peakBytes,
    residentBeforeBytes: 0,
    peakAddedBytes: given.peakBytes,
    peakMeasured: given.peakMeasured,
    readCalls: 0,
    writeCalls: 0,
    readBytes: 0,
    pathsChanged: 0,
    refusals: given.refusals,
  }
}

function lineFor(cost: Cost): string {
  return `${JSON.stringify(cost)}\n`
}

function partAt(page: string, under: string, part: number): string | null {
  return uncommittedPartAt(page, under, HELD, part)
}

export type Filling = { readonly at: string; readonly opened: boolean }

export function fillingAt(
  root: string,
  page: string,
  adding: number,
  under: string = ENTRIES
): Filling | null {
  let part = FIRST_PART
  let found = partAt(page, under, part)
  if (found === null) return null
  for (;;) {
    const next = partAt(page, under, part + 1)
    if (next === null || !existsSync(join(root, next))) break
    part += 1
    found = next
  }
  const size = sizeOnDisk(join(root, found))
  if (size === 0) return { at: found, opened: true }
  if (size + adding <= ENTRY_CEILING) {
    return { at: found, opened: false }
  }
  const next = partAt(page, under, part + 1)
  return next === null ? { at: found, opened: false } : { at: next, opened: true }
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

const TURN_MS = 5_000

function appendedIn(root: string, page: string, line: string, under: string): string | null {
  const filling = fillingAt(root, page, Buffer.byteLength(line, "utf8"), under)
  if (filling === null) return null
  appendFileSync(join(root, filling.at), line)
  if (filling.opened) partFiled(root, page, filling.at)
  return filling.at
}

export function recordCost(
  root: string,
  page: string,
  cost: Cost,
  under: string = ENTRIES
): string | null {
  const turn = partAt(page, under, FIRST_PART)
  if (turn === null) return null
  const line = lineFor(cost)
  try {
    return exclusively(
      join(root, turn),
      (): string | null => appendedIn(root, page, line, under),
      TURN_MS
    )
  } catch {
    if (!existsSync(join(root, page))) throw new Error(`\`${page}\` ${NAMES_NO_PAGE}`)
    return null
  }
}
