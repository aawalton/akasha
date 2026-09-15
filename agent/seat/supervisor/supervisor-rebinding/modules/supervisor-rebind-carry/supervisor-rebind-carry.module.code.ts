import type { StatedAgentSlots } from "akasha/agent/seat/supervisor/supervisor-rebinding/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"

export type CarriedAgentName = {
  name: string
  title: string | undefined
  slots: StatedAgentSlots
}
