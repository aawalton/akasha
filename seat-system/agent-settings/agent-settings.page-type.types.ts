import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { HarnessSettings } from "./properties/harness-settings.file-property.ts"

export type AgentSettings = Domain & {
  harnessSettings: HarnessSettings
}
