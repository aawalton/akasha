import type {
  ProfilerAccumulator,
  ProfilerCounter,
  ProfilerEntry,
  ProfilerRecord,
  ProfilerSourceBucket,
  ResolvedEntry,
} from "../inventory-bank-profile-types/inventory-bank-profile-types.module.code.ts"
export function emptyAccumulator(): ProfilerAccumulator {
  return {
    closures: new Map<number, ProfilerCounter>(),
    cfunctions: new Map<number, ProfilerCounter>(),
    rootInclusiveNs: 0,
    gcInclusiveNs: 0,
    recordCount: 0,
  }
}

function foldCounter(
  map: Map<number, ProfilerCounter>,
  dataIndex: number,
  inclusiveNs: number,
  selfNs: number
): undefined {
  const existing = map.get(dataIndex)
  if (existing === undefined) {
    map.set(dataIndex, { callCount: 1, inclusiveNs, selfNs })
    return
  }
  existing.callCount += 1
  existing.inclusiveNs += inclusiveNs
  existing.selfNs += selfNs
}

export function accumulateFrame(
  acc: ProfilerAccumulator,
  records: readonly ProfilerRecord[]
): undefined {
  const childNs = new Map<number, number>()
  for (const r of records) {
    const caller = r.callerIndex
    if (caller === undefined) continue
    const inc = r.endNs - r.startNs
    const incFloor = inc > 0 ? inc : 0
    childNs.set(caller, (childNs.get(caller) ?? 0) + incFloor)
  }
  let recordIndex = 0
  for (const r of records) {
    recordIndex += 1
    const rawInc = r.endNs - r.startNs
    const inclusiveNs = rawInc > 0 ? rawInc : 0
    const childrenNs = childNs.get(recordIndex) ?? 0
    const rawSelf = inclusiveNs - childrenNs
    const selfNs = rawSelf > 0 ? rawSelf : 0
    acc.recordCount += 1
    if (r.callerIndex === undefined) acc.rootInclusiveNs += inclusiveNs
    if (r.kind === "closure") {
      foldCounter(acc.closures, r.dataIndex, inclusiveNs, selfNs)
    } else if (r.kind === "cfunction") {
      foldCounter(acc.cfunctions, r.dataIndex, inclusiveNs, selfNs)
    } else if (r.kind === "gc") {
      acc.gcInclusiveNs += inclusiveNs
    }
  }
}

export function nsToMs(ns: number): number {
  return Math.round(ns / 100000) / 10
}

export function sourceBucket(source: string): string {
  if (source === "[C]") return "[C]"
  const marker = "AddOns/"
  const idx = source.indexOf(marker)
  if (idx >= 0) {
    const rest = source.substring(idx + marker.length)
    const slash = rest.indexOf("/")
    const name = slash >= 0 ? rest.substring(0, slash) : rest
    if (name !== "") return `AddOns/${name}`
  }
  if (source.includes("EsoUI/")) return "EsoUI/"
  return "other"
}

export function bucketBySource(entries: readonly ResolvedEntry[]): ProfilerSourceBucket[] {
  const bySource = new Map<string, ProfilerSourceBucket>()
  for (const e of entries) {
    const key = sourceBucket(e.source)
    const existing = bySource.get(key)
    if (existing === undefined) {
      bySource.set(key, {
        source: key,
        selfMs: e.selfNs,
        inclusiveMs: e.inclusiveNs,
        callCount: e.callCount,
      })
    } else {
      existing.selfMs += e.selfNs
      existing.inclusiveMs += e.inclusiveNs
      existing.callCount += e.callCount
    }
  }
  const out: ProfilerSourceBucket[] = []
  bySource.forEach((b) => {
    out.push({
      source: b.source,
      selfMs: nsToMs(b.selfMs),
      inclusiveMs: nsToMs(b.inclusiveMs),
      callCount: b.callCount,
    })
  })
  out.sort((a, b) => b.selfMs - a.selfMs)
  return out
}

function toEntry(e: ResolvedEntry): ProfilerEntry {
  return {
    kind: e.kind,
    name: e.name,
    source: e.source,
    line: e.line,
    callCount: e.callCount,
    inclusiveMs: nsToMs(e.inclusiveNs),
    selfMs: nsToMs(e.selfNs),
  }
}

export function selectTop(
  entries: readonly ResolvedEntry[],
  metric: "inclusive" | "self",
  n: number
): ProfilerEntry[] {
  const sorted = [...entries].sort((a, b) =>
    metric === "inclusive" ? b.inclusiveNs - a.inclusiveNs : b.selfNs - a.selfNs
  )
  const top: ProfilerEntry[] = []
  const limit = sorted.length < n ? sorted.length : n
  for (const e of sorted.slice(0, limit)) top.push(toEntry(e))
  return top
}
