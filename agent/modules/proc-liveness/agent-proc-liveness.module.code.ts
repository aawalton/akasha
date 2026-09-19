import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"

function isAgentId(agentId: string): boolean {
  return lowerUuid(agentId.toLowerCase())
}

const CLAUDE_CHILD_CMDLINE_RE = /\bclaude\b.*--dangerously-skip-permissions/

const SUPERVISOR_CMDLINE_RE = /^(?:\S*\/)?bun\b.*\brun-supervisor(?:\.module\.code)?\.ts/

export function isSupervisorCmdline(cmdline: string): boolean {
  return SUPERVISOR_CMDLINE_RE.test(cmdline)
}

export function isClaudeChildCmdline(cmdline: string): boolean {
  return CLAUDE_CHILD_CMDLINE_RE.test(cmdline)
}

export function isAgentProcessCmdline(cmdline: string): boolean {
  return isClaudeChildCmdline(cmdline) || isSupervisorCmdline(cmdline)
}

export type ProcLivenessEntry = {
  agentId: string
  actingAgentId?: string
  cmdline: string
  pid: number
  startMs?: number
  ppid?: number
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
