import type { ProcLivenessEntry } from "akasha/seat-system/seat-proc-liveness/seat-proc-liveness.module.code.ts"

const CLAUDE_CHILD = "claude --dangerously-skip-permissions --model opus"

export function entry(over: Partial<ProcLivenessEntry> & { agentId: string }): ProcLivenessEntry {
  return { cmdline: CLAUDE_CHILD, pid: 1, ...over }
}
