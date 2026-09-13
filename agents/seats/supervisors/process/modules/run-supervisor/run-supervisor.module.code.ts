import { watchSessionFile } from "akasha/agents/claude-code/session/modules/session-watch/session-watch.module.code.ts"
import { openSeatGroup } from "akasha/agents/seats/launching/modules/seat-grouping/seat-grouping.module.code.ts"
import { refuseSeatName } from "akasha/agents/seats/name-claiming/modules/seat-name-bind/seat-name-bind.module.code.ts"
import { resolveSeatSpawnDecisions } from "akasha/agents/seats/supervisors/child/modules/supervisor-seat-spawn-decisions/supervisor-seat-spawn-decisions.module.code.ts"
import { runSupervisor } from "akasha/agents/seats/supervisors/process/modules/supervisor/supervisor.module.code.ts"
import { liveRebindDepsWith } from "akasha/agents/seats/supervisors/rebinding/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"

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
