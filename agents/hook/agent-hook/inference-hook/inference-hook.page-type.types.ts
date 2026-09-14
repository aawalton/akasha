import type { AgentHook } from "akasha/agents/hook/agent-hook/agent-hook.page-type.types.ts"
import type { StopGates } from "akasha/agents/hook/agent-hook/inference-hook/properties/stop-gates.file-property.types.ts"

export type InferenceHook = AgentHook & {
  stopGates?: StopGates
}
