import { watchSessionFile } from "akasha/agents/claude-code/session/modules/session-watch/session-watch.module.code.ts"
import { openSeatGroup } from "akasha/agents/seats/modules/grouping/seat-grouping.module.code.ts"
import { refuseSeatName } from "akasha/agents/seats/modules/name-bind/seat-name-bind.module.code.ts"
import { runSupervisor } from "akasha/seat-system/supervising/supervisor/supervisor.module.code.ts"
import { liveRebindDepsWith } from "akasha/seat-system/supervising/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import { resolveSeatSpawnDecisions } from "akasha/seat-system/supervising/supervisor-seat-spawn-decisions/supervisor-seat-spawn-decisions.module.code.ts"

if (import.meta.main) {
  openSeatGroup()
  runSupervisor({
    startSessionWatch: watchSessionFile,
    rebindDeps: liveRebindDepsWith(async (agentId, name) => {
      await refuseSeatName(agentId, name)
    }),
    resolveSeatSpawnDecisions,
  })
}
