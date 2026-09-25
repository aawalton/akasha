import type { DispatchedAs } from "akasha/agent/subagent/kind/properties/dispatched-as.text-property.types.ts"
import type { Model } from "akasha/agent/subagent/kind/properties/model.text-property.types.ts"
import type { SubagentPrompt } from "akasha/agent/subagent/kind/properties/subagent-prompt.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type SubagentKind = Domain & {
  dispatchedAs: DispatchedAs
  subagentPrompt?: SubagentPrompt
  model?: Model
}
