import { watchSessionFile } from "akasha/agent/claude-code/session/modules/session-watch/session-watch.module.code.ts"
import { openSeatGroup } from "akasha/agent/seat/launching/modules/seat-grouping/seat-grouping.module.code.ts"
import { refuseSeatName } from "akasha/agent/seat/name/modules/bind/seat-name-bind.module.code.ts"
import { resolveSeatSpawnDecisions } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-seat-spawn-decisions/supervisor-seat-spawn-decisions.module.code.ts"
import { runSupervisor } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor/supervisor.module.code.ts"
import { liveRebindDepsWith } from "akasha/agent/seat/supervisor/supervisor-rebinding/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"

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
