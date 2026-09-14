import type { AgentHook } from "akasha/agents/hooks/agent-hooks/agent-hook.page-type.types.ts"
import type { StopGates } from "akasha/agents/hooks/agent-hooks/inference-hook/properties/stop-gates.file-property.types.ts"

export type InferenceHook = AgentHook & {
  stopGates?: StopGates
}
