import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { shape } from "@akasha/utils-narrow/shape"
import { akashaSeatsThatExist } from "../../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { agentPresence } from "../../seat-presence-read/seat-presence-read.module.code.ts"
import { principalSeatIdOf } from "../../seat-principal/seat-principal.module.code.ts"
import type { SeatPresence } from "../../seat-proc-key/seat-proc-key.module.code.ts"
import type {
  BusyChildDetail,
  IdleObservation,
  IdleRuleSource,
} from "../supervisor-idle-rule/supervisor-idle-rule.module.code.ts"

const INFLIGHT_FETCH_TIMEOUT_MS = 1_000

const inFlightResponseShape = shape
  .object({ inFlight: shape.number().int().nonnegative() })
  .passthrough()

export function parseInFlightResponse(body: unknown): number | null {
  const parsed = inFlightResponseShape.safeParse(body)
  return parsed.success ? parsed.data.inFlight : null
}

async function fetchInFlight(port: number | null): Promise<number | null> {
  if (port == null) return null
  try {
    const res = await fetch(`http://localhost:${port}/inflight`, {
      signal: AbortSignal.timeout(INFLIGHT_FETCH_TIMEOUT_MS),
    })
    if (!res.ok) return null
    return parseInFlightResponse(await res.json())
  } catch {
    return null
  }
}

export interface DispatchChild {
  readonly agentId: string
  readonly principalSeatId: string | null
  readonly presence: SeatPresence
}

export function selectInFlightDispatch(
  children: readonly DispatchChild[],
  parentAgentId: string
): readonly DispatchChild[] {
  return children.filter(
    (one) => one.principalSeatId === parentAgentId && one.presence !== "absent"
  )
}

// EVERY SEAT IS LISTED FROM AKASHA, which answers the ids without a page being opened for one. This
// walked the old seat directory and read each file's frontmatter for the id it states, and what it
// wanted from that page was the id alone.
export function dispatchChildrenNow(): readonly DispatchChild[] {
  const found: DispatchChild[] = []
  for (const agentId of akashaSeatsThatExist().keys()) {
    found.push({
      agentId,
      principalSeatId: principalSeatIdOf(agentId),
      presence: agentPresence(agentId),
    })
  }
  return found
}

function readChildPids(claudePid: number): readonly string[] | null {
  try {
    const taskDir = `/proc/${claudePid}/task`
    const childPids = new Set<string>()
    for (const tid of readdirSync(taskDir)) {
      const content = readFileSync(`${taskDir}/${tid}/children`, "utf8")
      for (const pid of content.trim().split(/\s+/)) {
        if (pid !== "") childPids.add(pid)
      }
    }
    return [...childPids]
  } catch {
    return null
  }
}

async function scanBusyChildren(
  claudePid: number,
  idleRule: IdleRuleSource
): Promise<readonly { pid: string; cmdline: string }[] | null> {
  const childPids = readChildPids(claudePid)
  if (childPids == null) return null
  const busy: Array<{ pid: string; cmdline: string }> = []
  const asked: Array<{ pid: string; cmdline: string }> = []
  for (const childPid of childPids) {
    let cmdline: string
    try {
      cmdline = readFileSync(`/proc/${childPid}/cmdline`, "utf8").replaceAll("\0", " ").trim()
    } catch {
      busy.push({ pid: childPid, cmdline: "<unreadable>" })
      continue
    }
    asked.push({ pid: childPid, cmdline })
  }
  if (asked.length > 0) {
    const { value: ignored } = await idleRule.ignoredMcpCmdlines(asked.map((c) => c.cmdline))
    asked.forEach((child, at) => {
      if (ignored[at] !== true) busy.push(child)
    })
  }
  return busy
}

async function observeClaude(
  claudePid: number | null,
  idleRule: IdleRuleSource
): Promise<{
  claudePresent: boolean
  busyChildren: number | null
}> {
  if (claudePid == null || !existsSync(`/proc/${claudePid}`)) {
    return { claudePresent: false, busyChildren: null }
  }
  const busy = await scanBusyChildren(claudePid, idleRule)
  return { claudePresent: true, busyChildren: busy == null ? null : busy.length }
}

export async function observeBusyChildDetails(
  claudePid: number | null,
  idleRule: IdleRuleSource,
  now: () => number = Date.now
): Promise<readonly BusyChildDetail[]> {
  if (claudePid == null) return []
  const busy = await scanBusyChildren(claudePid, idleRule)
  if (busy == null) return []
  return busy.map(({ pid, cmdline }) => {
    const st = statSync(`/proc/${pid}`, { throwIfNoEntry: false })
    return { pid, cmdline, ageMs: st ? now() - st.mtimeMs : null }
  })
}

function observeInFlightDispatchChildren(agentId: string | null): number {
  if (agentId == null) return 0
  return selectInFlightDispatch(dispatchChildrenNow(), agentId).length
}

export async function observeIdle(opts: {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  getAgentId: () => string | null
  idleRule: IdleRuleSource
}): Promise<IdleObservation> {
  const inFlight = await fetchInFlight(opts.getProxyPort())
  const { claudePresent, busyChildren } = await observeClaude(opts.getClaudePid(), opts.idleRule)
  const inFlightDispatchChildren = observeInFlightDispatchChildren(opts.getAgentId())
  return { inFlight, busyChildren, inFlightDispatchChildren, claudePresent }
}
