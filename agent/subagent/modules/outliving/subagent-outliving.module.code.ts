import { statSync } from "node:fs"
import { join } from "node:path"
import {
  findLiveClaudeChild,
  type ProcLivenessEntry,
} from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"

const PROC = "/proc"

const SUBAGENTS = "subagents"

const TAIL = ".jsonl"

type LastRecordAt = (subagentsDir: string, own: string) => number | null

export function clientStartedAt(pid: number, procRoot: string = PROC): number | null {
  try {
    return statSync(join(procRoot, String(pid))).mtimeMs
  } catch {
    return null
  }
}

export type ClientPidOf = (seatId: string) => number | null

export function clientPidIn(
  entries: readonly ProcLivenessEntry[],
  supervisorPidOf: (seatId: string) => number | null
): ClientPidOf {
  return (seatId) => {
    const supervisor = supervisorPidOf(seatId)
    return supervisor === null ? null : findLiveClaudeChild(seatId, entries, supervisor)
  }
}

export function subagentsDirOf(transcriptPath: string): string {
  return join(transcriptPath.replace(/\.jsonl$/, ""), SUBAGENTS)
}

function lastRecordAt(subagentsDir: string, own: string): number | null {
  try {
    return statSync(join(subagentsDir, `agent-${own}${TAIL}`)).mtimeMs
  } catch {
    return null
  }
}

export function outlived(startedAt: number | null, lastAt: number | null): boolean {
  if (startedAt === null || lastAt === null) return false
  return lastAt < startedAt
}

export function outlivedAmong(
  owns: Iterable<string>,
  subagentsDir: string,
  startedAt: number | null,
  reading: LastRecordAt = lastRecordAt
): ReadonlySet<string> {
  const found = new Set<string>()
  if (startedAt === null) return found
  for (const own of owns) {
    if (own === "") continue
    if (outlived(startedAt, reading(subagentsDir, own))) found.add(own)
  }
  return found
}
