import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Model } from "../seats/properties/model.text-property.ts"
import type { DispatchedAs } from "./properties/dispatched-as.text-property.ts"
import type { SubagentPrompt } from "./properties/subagent-prompt.file-property.ts"

export type SubagentKind = Domain & {
  dispatchedAs: DispatchedAs
  subagentPrompt: SubagentPrompt
  model?: Model
}
