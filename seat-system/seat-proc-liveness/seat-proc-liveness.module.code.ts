import { lowerUuid } from "akasha/pages/name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"

export function isAgentId(agentId: string): boolean {
  return lowerUuid(agentId.toLowerCase())
}

const CLAUDE_CHILD_CMDLINE_RE = /\bclaude\b.*--dangerously-skip-permissions/

const SUPERVISOR_CMDLINE_RE = /^(?:\S*\/)?bun\b.*supervisor\.ts/

const SEAT_INFRA_CMDLINE_RE =
  /packages\/agents\/(?:oauth-proxy\/src\/main|messages\/mcp)\.ts\b|\bmessages-mcp(?:\.module\.code)?\.ts\b|\bmodel-gateway\/main\.ts\b/

export function isSupervisorCmdline(cmdline: string): boolean {
  return SUPERVISOR_CMDLINE_RE.test(cmdline)
}

export function isClaudeChildCmdline(cmdline: string): boolean {
  return CLAUDE_CHILD_CMDLINE_RE.test(cmdline)
}

export function isAgentProcessCmdline(cmdline: string): boolean {
  return isClaudeChildCmdline(cmdline) || isSupervisorCmdline(cmdline)
}

function isSeatInfrastructureCmdline(cmdline: string): boolean {
  return SEAT_INFRA_CMDLINE_RE.test(cmdline)
}

export type ProcLivenessEntry = {
  agentId: string
  actingAgentId?: string
  cmdline: string
  pid: number
  startMs?: number
  state?: string
  ppid?: number
}

function agentIdsWhere(
  entries: readonly ProcLivenessEntry[],
  held: (cmdline: string) => boolean
): Set<string> {
  const live = new Set<string>()
  for (const { agentId, cmdline } of entries) {
    if (!isAgentId(agentId)) continue
    if (!held(cmdline)) continue
    live.add(agentId)
  }
  return live
}

export function liveAgentIdsFromProc(entries: readonly ProcLivenessEntry[]): Set<string> {
  return agentIdsWhere(entries, isAgentProcessCmdline)
}

export function liveClaudeChildIdsFromProc(entries: readonly ProcLivenessEntry[]): Set<string> {
  return agentIdsWhere(entries, isClaudeChildCmdline)
}

export function liveSupervisorIdsFromProc(entries: readonly ProcLivenessEntry[]): Set<string> {
  return agentIdsWhere(entries, isSupervisorCmdline)
}

export function backgroundTaskCmdlinesByAgent(
  entries: readonly ProcLivenessEntry[]
): Map<string, string[]> {
  const liveClaudeChildIds = liveClaudeChildIdsFromProc(entries)
  const out = new Map<string, string[]>()
  for (const { agentId, cmdline, state } of entries) {
    if (!isAgentId(agentId)) continue
    if (!liveClaudeChildIds.has(agentId)) continue
    if (isAgentProcessCmdline(cmdline)) continue
    if (isSeatInfrastructureCmdline(cmdline)) continue
    if (state === "D") continue
    const prev = out.get(agentId)
    if (prev === undefined) out.set(agentId, [cmdline])
    else prev.push(cmdline)
  }
  return out
}

export function agentsWithInFlightBackgroundTask(
  entries: readonly ProcLivenessEntry[]
): Set<string> {
  return new Set(backgroundTaskCmdlinesByAgent(entries).keys())
}

export function liveAgentPidsFromProc(
  entries: readonly ProcLivenessEntry[]
): Map<string, number[]> {
  const byId = new Map<string, number[]>()
  for (const { agentId, cmdline, pid } of entries) {
    if (!isAgentId(agentId)) continue
    if (!isAgentProcessCmdline(cmdline)) continue
    const existing = byId.get(agentId)
    if (existing === undefined) byId.set(agentId, [pid])
    else existing.push(pid)
  }
  return byId
}

export function actingAgentPidsFromProc(
  entries: readonly ProcLivenessEntry[]
): Map<string, number[]> {
  const byId = new Map<string, number[]>()
  for (const { actingAgentId, pid } of entries) {
    if (actingAgentId === undefined || actingAgentId === "") continue
    const existing = byId.get(actingAgentId)
    if (existing === undefined) byId.set(actingAgentId, [pid])
    else existing.push(pid)
  }
  return byId
}
