import { InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"
import { proxyFetch } from "../cluster-api-reaching/cluster-api-reaching.module.code.ts"

export interface FetchLokiLogsArgs {
  pod: string
  namespace: string
  since: string
  limit: number
  cursor: string | null
  commitSha?: string
  inputsHash?: string
}

export interface LogEntry {
  timestamp: string
  line: string
}

export interface LokiFetchResult {
  lines: readonly LogEntry[]
  cursor: string | null
  isDone: boolean
}

interface LokiQueryRangeResponse {
  data: {
    result: ReadonlyArray<{
      stream: Record<string, string>
      values: ReadonlyArray<readonly [string, string]>
    }>
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isLokiQueryRangeResponse(value: unknown): value is LokiQueryRangeResponse {
  if (!isRecord(value)) return false
  const data = value.data
  if (!isRecord(data)) return false
  const result = data.result
  if (!Array.isArray(result)) return false
  for (const stream of result) {
    if (!isRecord(stream)) return false
    if (!Array.isArray(stream.values)) return false
  }
  return true
}

const DURATION_MULTIPLIERS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
} satisfies Record<string, number>

export function parseLokiDuration(flag: string, since: string): number {
  const matchResult = z
    .tuple([z.string(), z.string(), z.enum(["s", "m", "h", "d"])])
    .nullable()
    .parse(since.match(/^(\d+)\s*(d|h|m|s)$/))
  if (!matchResult) {
    throw new InputError(
      `${flag}: invalid duration "${since}" — expected format like "30m", "1h", "2d" ` +
        "(units: s, m, h, d)"
    )
  }
  const value = Number(matchResult[1])
  const unit = matchResult[2]
  return value * DURATION_MULTIPLIERS[unit]
}

export function parseLokiPositiveInt(flag: string, value: string): number {
  const n = Number(value)
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) {
    throw new InputError(`${flag} must be a positive integer, got: ${value}`)
  }
  return n
}

export function escapeLokiLabelValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

const LokiSeriesResponse = z.object({
  data: z.array(z.record(z.string(), z.string())),
})

export async function findPodNamespaces(args: {
  pod: string
  since: string
}): Promise<readonly string[]> {
  try {
    const nowNs = BigInt(Date.now()) * 1_000_000n
    const sinceMs = parseLokiDuration("--since", args.since)
    const startNs = nowNs - BigInt(sinceMs) * 1_000_000n
    const params = new URLSearchParams({
      "match[]": `{pod=~"${escapeLokiLabelValue(args.pod)}.*"}`,
      start: startNs.toString(),
      end: nowNs.toString(),
    })
    const res = await proxyFetch("loki", "loki", 3100, `/loki/api/v1/series?${params.toString()}`)
    if (!res.ok) return []
    const parsed = LokiSeriesResponse.safeParse(await res.json())
    if (!parsed.success) return []
    const namespaces = new Set<string>()
    for (const labels of parsed.data.data) {
      const ns = labels.namespace
      if (ns !== undefined) namespaces.add(ns)
    }
    return [...namespaces].sort()
  } catch {
    return []
  }
}

export const LOKI_RETENTION_MS = 168 * 3_600_000
export const LOKI_RETENTION_LABEL = "7d"

function buildLogMatcher(args: {
  pod: string
  namespace: string
  commitSha?: string
  inputsHash?: string
}): string {
  const matchers: string[] = [
    `pod=~"${escapeLokiLabelValue(args.pod)}.*"`,
    `namespace="${escapeLokiLabelValue(args.namespace)}"`,
  ]
  if (args.commitSha !== undefined) {
    matchers.push(`pipeline_engine_commit_sha="${args.commitSha}"`)
  }
  if (args.inputsHash !== undefined) {
    matchers.push(`pipeline_engine_inputs_hash="${args.inputsHash}"`)
  }
  return `{${matchers.join(", ")}}`
}

export async function hasLinesBeforeWindow(args: {
  pod: string
  namespace: string
  since: string
  commitSha?: string
  inputsHash?: string
}): Promise<boolean | null> {
  try {
    const nowNs = BigInt(Date.now()) * 1_000_000n
    const sinceMs = parseLokiDuration("--since", args.since)
    const windowStartNs = nowNs - BigInt(sinceMs) * 1_000_000n
    const retentionStartNs = nowNs - BigInt(LOKI_RETENTION_MS) * 1_000_000n
    if (retentionStartNs >= windowStartNs) return false
    const params = new URLSearchParams({
      query: buildLogMatcher(args),
      start: retentionStartNs.toString(),
      end: windowStartNs.toString(),
      limit: "1",
      direction: "backward",
    })
    const res = await proxyFetch(
      "loki",
      "loki",
      3100,
      `/loki/api/v1/query_range?${params.toString()}`
    )
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!isLokiQueryRangeResponse(data)) return null
    return data.data.result.some((stream) => stream.values.length > 0)
  } catch {
    return null
  }
}

export async function fetchLokiLogs(args: FetchLokiLogsArgs): Promise<LokiFetchResult> {
  const nowNs = BigInt(Date.now()) * 1_000_000n
  const sinceMs = parseLokiDuration("--since", args.since)
  const startNs = nowNs - BigInt(sinceMs) * 1_000_000n

  let endNs = nowNs
  if (args.cursor != null) {
    try {
      endNs = BigInt(Buffer.from(args.cursor, "base64").toString("utf-8"))
    } catch {
      throw new InputError(
        "--cursor: invalid value (expected base64-encoded nanosecond timestamp from a prior " +
          "--json response)"
      )
    }
  }

  const params = new URLSearchParams({
    query: buildLogMatcher(args),
    start: startNs.toString(),
    end: endNs.toString(),
    limit: String(args.limit),
    direction: "backward",
  })

  const res = await proxyFetch(
    "loki",
    "loki",
    3100,
    `/loki/api/v1/query_range?${params.toString()}`
  )

  if (!res.ok) {
    const body = await res.text()
    throw new OperationalError(`Loki query failed: ${res.status} ${body}`)
  }

  const data: unknown = await res.json()
  if (!isLokiQueryRangeResponse(data)) {
    throw new OperationalError(`unexpected Loki response shape: ${JSON.stringify(data)}`)
  }

  const entries: Array<{ tsNs: string; timestamp: string; line: string }> = []
  for (const stream of data.data.result) {
    for (const [tsNs, line] of stream.values) {
      const ms = Number(BigInt(tsNs) / 1_000_000n)
      entries.push({ tsNs, timestamp: new Date(ms).toISOString(), line })
    }
  }

  entries.sort((a, b) => (a.tsNs > b.tsNs ? -1 : a.tsNs < b.tsNs ? 1 : 0))

  let cursor: string | null = null
  const lastEntry = entries[entries.length - 1]
  if (entries.length === args.limit && lastEntry) {
    const earliestNs = lastEntry.tsNs
    cursor = Buffer.from((BigInt(earliestNs) - 1n).toString()).toString("base64")
  }

  const lines = entries.map(({ timestamp, line }) => ({ timestamp, line }))
  return { lines, cursor, isDone: cursor === null }
}

export const MAX_LOKI_PAGE_LIMIT = 5000
export const MAX_LOKI_PAGES = 400

export async function fetchAllLokiLogs(
  args: Omit<FetchLokiLogsArgs, "cursor" | "limit"> & { pageLimit?: number }
): Promise<readonly LogEntry[]> {
  const pageLimit = Math.min(args.pageLimit ?? MAX_LOKI_PAGE_LIMIT, MAX_LOKI_PAGE_LIMIT)
  const all: LogEntry[] = []
  let cursor: string | null = null
  for (let page = 0; page < MAX_LOKI_PAGES; page++) {
    const res = await fetchLokiLogs({ ...args, limit: pageLimit, cursor })
    all.push(...res.lines)
    if (res.isDone) return all
    cursor = res.cursor
  }
  throw new OperationalError(
    `--all: exceeded ${MAX_LOKI_PAGES} pages (${MAX_LOKI_PAGES * pageLimit} lines) without ` +
      "reaching the end of the log; narrow the window with --since"
  )
}
