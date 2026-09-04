import { refuseSeatName } from "@akasha/seat-system/seat-name-bind"
import { watchSessionFile } from "@akasha/seat-system/session-watch"
import { runSupervisor } from "@akasha/seat-system/supervisor"
import { liveRebindDepsWith } from "@akasha/seat-system/supervisor-rebind-deps"
import { resolveSeatSpawnDecisions } from "@akasha/seat-system/supervisor-seat-spawn-decisions"

if (import.meta.main) {
  runSupervisor({
    startSessionWatch: watchSessionFile,
    rebindDeps: liveRebindDepsWith(async (agentId, name) => {
      await refuseSeatName(agentId, name)
    }),
    resolveSeatSpawnDecisions,
  })
}
