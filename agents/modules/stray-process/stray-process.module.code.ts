import type { ProcLivenessEntry } from "akasha/agents/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { scanProcEntries } from "akasha/agents/modules/proc-scan/proc-scan.module.code.ts"
import { SUBAGENT_MARK } from "akasha/agents/modules/read-record/read-record.module.code.ts"
import {
  actingIn,
  type Liveness,
  readFor,
} from "akasha/agents/subagents/modules/liveness/subagent-liveness.module.code.ts"

export type Stray = {
  readonly pid: number
  readonly actingAgentId: string
  readonly cmdline: string
}

export type Reading = {
  readonly strays: readonly Stray[]
  readonly unread: readonly string[]
}

export type Asking = (actingAgentId: string) => Promise<Liveness>

export function namesASubagent(actingAgentId: string): boolean {
  return actingAgentId.indexOf(SUBAGENT_MARK) > 0
}

export function underSubagents(
  entries: readonly ProcLivenessEntry[]
): ReadonlyMap<string, readonly ProcLivenessEntry[]> {
  const grouped = new Map<string, ProcLivenessEntry[]>()
  for (const one of entries) {
    const acting = one.actingAgentId
    if (acting === undefined || acting === "") continue
    if (!namesASubagent(acting)) continue
    const held = grouped.get(acting)
    if (held === undefined) grouped.set(acting, [one])
    else held.push(one)
  }
  return grouped
}

export async function strayAmong(
  entries: readonly ProcLivenessEntry[],
  asking: Asking
): Promise<Reading> {
  const grouped = underSubagents(entries)
  const strays: Stray[] = []
  const unread: string[] = []
  for (const actingAgentId of [...grouped.keys()].sort()) {
    const liveness = await asking(actingAgentId)
    if (liveness === "unread") {
      unread.push(actingAgentId)
      continue
    }
    if (liveness === "working") continue
    const group = [...(grouped.get(actingAgentId) ?? [])].sort((a, b) => a.pid - b.pid)
    for (const one of group) strays.push({ pid: one.pid, actingAgentId, cmdline: one.cmdline })
  }
  return { strays, unread }
}

export async function livenessAsked(actingAgentId: string): Promise<Liveness> {
  const acting = actingIn(actingAgentId)
  if (acting === null) return "unread"
  return (await readFor(acting)).liveness
}

export async function strayNow(
  entries: readonly ProcLivenessEntry[] = scanProcEntries().entries,
  asking: Asking = livenessAsked
): Promise<Reading> {
  return await strayAmong(entries, asking)
}
