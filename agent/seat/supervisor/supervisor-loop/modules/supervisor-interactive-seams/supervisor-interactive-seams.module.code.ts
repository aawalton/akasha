import type { SeatSpawnDecider } from "akasha/agent/seat/supervisor/supervisor-child/modules/supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"
import type { ClearRebindDeps } from "akasha/agent/seat/supervisor/supervisor-rebinding/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"

export type SessionWatchStart = (agentId: string, sessionId: string, projDir: string) => () => void

export interface RunInteractiveSeams {
  startSessionWatch: SessionWatchStart
  rebindDeps: ClearRebindDeps
  resolveSeatSpawnDecisions: SeatSpawnDecider
}
