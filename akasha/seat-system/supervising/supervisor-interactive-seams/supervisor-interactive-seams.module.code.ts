import type { ClearRebindHooks } from "@tools/lib/supervisor-rebind"
import type { ClearRebindDeps } from "@tools/lib/supervisor-rebind-deps"
import type { SeatSpawnDecider } from "../supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"

export interface RunInteractiveSeams {
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
  rebindDeps: ClearRebindDeps
  resolveSeatSpawnDecisions: SeatSpawnDecider
}
