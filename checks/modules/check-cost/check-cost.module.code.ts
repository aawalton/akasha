import { Buffer } from "node:buffer"
import { appendFileSync, existsSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import { uncommittedPartAt } from "@akasha/pages-system/page-file-parts"

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

export type Cost = {
  readonly ranAt: string
  readonly phase: string
  readonly check: string
  readonly wallMs: number
  readonly cpuSeconds: number
  readonly childCpuSeconds: number
  readonly peakBytes: number
  readonly residentBeforeBytes: number
  readonly peakAddedBytes: number
  readonly peakMeasured: boolean
  readonly pathsJudged: number
  readonly refusals: number
}

export type Taken = {
  readonly cpu: number
  readonly childCpu: number
  readonly peak: number
  readonly resident: number
  readonly measured: boolean
  readonly at: number
}

function textAt(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
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
  const stat = textAt(STAT)
  return stat === null ? 0 : childSecondsIn(stat)
}

function marksNow(): { readonly peak: number; readonly resident: number } {
  const status = textAt(STATUS)
  if (status === null) return { peak: 0, resident: 0 }
  return { peak: bytesIn(status, "VmHWM"), resident: bytesIn(status, "VmRSS") }
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
  const used = process.cpuUsage()
  return {
    cpu: (used.user + used.system) / A_MILLION,
    childCpu: childSeconds(),
    peak: marks.peak,
    resident: marks.resident,
    measured,
    at: Date.now(),
  }
}

export function closing(): Taken {
  const marks = marksNow()
  const used = process.cpuUsage()
  return {
    cpu: (used.user + used.system) / A_MILLION,
    childCpu: childSeconds(),
    peak: marks.peak,
    resident: marks.resident,
    measured: true,
    at: Date.now(),
  }
}

export function costOf(
  before: Taken,
  after: Taken,
  phase: string,
  check: string,
  pathsJudged: number,
  refusals: number
): Cost {
  return {
    ranAt: new Date(before.at).toISOString(),
    phase,
    check,
    wallMs: after.at - before.at,
    cpuSeconds: Number((after.cpu - before.cpu).toFixed(3)),
    childCpuSeconds: Number((after.childCpu - before.childCpu).toFixed(3)),
    peakBytes: after.peak,
    residentBeforeBytes: before.resident,
    peakAddedBytes: Math.max(after.peak - before.resident, 0),
    peakMeasured: before.measured,
    pathsJudged,
    refusals,
  }
}

export function lineFor(cost: Cost): string {
  return `${JSON.stringify(cost)}\n`
}

function sizeOf(path: string): number {
  try {
    return statSync(path).size
  } catch {
    return 0
  }
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
  if (sizeOf(join(root, found)) + adding <= ENTRY_CEILING) return found
  return partAt(page, part + 1) ?? found
}

export function recordCost(root: string, page: string, cost: Cost): string | null {
  const line = lineFor(cost)
  const at = fillingAt(root, page, Buffer.byteLength(line, "utf8"))
  if (at === null) return null
  try {
    appendFileSync(join(root, at), line)
    return at
  } catch {
    return null
  }
}
