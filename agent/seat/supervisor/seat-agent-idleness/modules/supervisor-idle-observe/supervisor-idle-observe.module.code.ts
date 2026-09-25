import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { principalSeatIdOf } from "akasha/agent/seat/declaration/modules/seat-principal/seat-principal.module.code.ts"
import { akashaSeatsThatExist } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { agentPresence } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  type BusyChildDetail,
  type IdleObservation,
  isIgnoredMcpChildCmdline,
} from "akasha/agent/seat/supervisor/seat-agent-idleness/modules/supervisor-idle-decide/supervisor-idle-decide.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const INFLIGHT_FETCH_TIMEOUT_MS = 1_000

const inFlightResponseShape = SHAPE.object({
  inFlight: SHAPE.number().int().nonnegative(),
}).passthrough()

function parseInFlightResponse(body: unknown): number | null {
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

interface DispatchChild {
  readonly agentId: string
  readonly principalSeatId: string | null
  readonly presence: SeatPresence
}

function selectInFlightDispatch(
  children: readonly DispatchChild[],
  parentAgentId: string
): readonly DispatchChild[] {
  return children.filter(
    (one) => one.principalSeatId === parentAgentId && one.presence !== "absent"
  )
}

function dispatchChildrenNow(): readonly DispatchChild[] {
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

function scanBusyChildren(claudePid: number): readonly { pid: string; cmdline: string }[] | null {
  const childPids = readChildPids(claudePid)
  if (childPids == null) return null
  const busy: Array<{ pid: string; cmdline: string }> = []
  for (const childPid of childPids) {
    let cmdline: string
    try {
      cmdline = readFileSync(`/proc/${childPid}/cmdline`, "utf8").replaceAll("\0", " ").trim()
    } catch {
      busy.push({ pid: childPid, cmdline: "<unreadable>" })
      continue
    }
    if (!isIgnoredMcpChildCmdline(cmdline)) busy.push({ pid: childPid, cmdline })
  }
  return busy
}

function observeClaude(claudePid: number | null): {
  claudePresent: boolean
  busyChildren: number | null
} {
  if (claudePid == null || !existsSync(`/proc/${claudePid}`)) {
    return { claudePresent: false, busyChildren: null }
  }
  const busy = scanBusyChildren(claudePid)
  return { claudePresent: true, busyChildren: busy == null ? null : busy.length }
}

export async function observeBusyChildDetails(
  claudePid: number | null,
  now: () => number = Date.now
): Promise<readonly BusyChildDetail[]> {
  if (claudePid == null) return []
  const busy = scanBusyChildren(claudePid)
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
}): Promise<IdleObservation> {
  const inFlight = await fetchInFlight(opts.getProxyPort())
  const { claudePresent, busyChildren } = observeClaude(opts.getClaudePid())
  const inFlightDispatchChildren = observeInFlightDispatchChildren(opts.getAgentId())
  return { inFlight, busyChildren, inFlightDispatchChildren, claudePresent }
}
