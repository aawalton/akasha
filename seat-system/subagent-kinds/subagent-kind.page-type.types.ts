import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Model } from "akasha/seat-system/seats/properties/model.text-property.types.ts"
import type { DispatchedAs } from "akasha/seat-system/subagent-kinds/properties/dispatched-as.text-property.types.ts"
import type { SubagentPrompt } from "akasha/seat-system/subagent-kinds/properties/subagent-prompt.file-property.types.ts"

export type SubagentKind = Domain & {
  dispatchedAs: DispatchedAs
  subagentPrompt: SubagentPrompt
  model?: Model
}
