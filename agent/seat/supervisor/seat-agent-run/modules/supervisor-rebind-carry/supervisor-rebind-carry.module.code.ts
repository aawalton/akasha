import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import type {
  ClearRebindDeps,
  StatedAgentSlots,
} from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"

export type CarriedAgentName = {
  name: string
  title: string | undefined
  slots: StatedAgentSlots
}

export async function applyCarriedName(
  agentId: string,
  carried: CarriedAgentName | null,
  bindAgentName: ClearRebindDeps["bindAgentName"]
): Promise<void> {
  if (carried === null) return
  try {
    await bindAgentName(agentId, carried.name, carried.title, carried.slots)
  } catch (err) {
    console.error(`${LOG} Failed to carry name onto reset successor ${agentId}:`, err)
  }
}
