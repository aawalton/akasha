import type { SeatSpawnDecider } from "akasha/seat-system/supervising/modules/supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"
import type { ClearRebindHooks } from "akasha/seat-system/supervising/modules/supervisor-rebind/supervisor-rebind.module.code.ts"
import type { ClearRebindDeps } from "akasha/seat-system/supervising/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"

export interface RunInteractiveSeams {
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
  rebindDeps: ClearRebindDeps
  resolveSeatSpawnDecisions: SeatSpawnDecider
}
