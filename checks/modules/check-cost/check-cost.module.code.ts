import { Buffer } from "node:buffer"
import { appendFileSync, existsSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { ENTRY_CEILING } from "@akasha/pages-system/entry-ceiling"
import { uncommittedPartAt } from "@akasha/pages-system/page-file-parts"

const ENTRIES = "entries"

const HELD = "jsonl"

const FIRST_PART = 1

const TICKS_A_SECOND = 100

const A_MILLION = 1_000_000

const KIB = 1024

export type Cost = {
  readonly ranAt: string
  readonly phase: string
  readonly check: string
  readonly wallMs: number
  readonly cpuSeconds: number
  readonly childCpuSeconds: number
  readonly peakBytesAdded: number
  readonly peakBytes: number
  readonly pathsJudged: number
  readonly refusals: number
}

export type Taken = {
  readonly cpu: number
  readonly childCpu: number
  readonly peak: number
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

export function peakBytesIn(status: string): number {
  for (const line of status.split("\n")) {
    if (!line.startsWith("VmHWM:")) continue
    const found = /(\d+)/.exec(line)
    if (found === null) return 0
    return Number(found[1]) * KIB
  }
  return 0
}

function childSeconds(): number {
  const stat = textAt("/proc/self/stat")
  return stat === null ? 0 : childSecondsIn(stat)
}

function peakBytes(): number {
  const status = textAt("/proc/self/status")
  return status === null ? 0 : peakBytesIn(status)
}

export function taken(): Taken {
  const used = process.cpuUsage()
  return {
    cpu: (used.user + used.system) / A_MILLION,
    childCpu: childSeconds(),
    peak: peakBytes(),
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
    peakBytesAdded: Math.max(after.peak - before.peak, 0),
    peakBytes: after.peak,
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
