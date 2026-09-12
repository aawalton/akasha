import type { Model } from "akasha/agents/seats/properties/model.text-property.types.ts"
import type { DispatchedAs } from "akasha/agents/subagents/subagent-kinds/properties/dispatched-as.text-property.types.ts"
import type { SubagentPrompt } from "akasha/agents/subagents/subagent-kinds/properties/subagent-prompt.file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type SubagentKind = Domain & {
  dispatchedAs: DispatchedAs
  subagentPrompt: SubagentPrompt
  model?: Model
}
