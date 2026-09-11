import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { HarnessSettings } from "akasha/seat-system/agent-settings/properties/harness-settings.file-property.ts"

export type AgentSettings = Domain & {
  harnessSettings: HarnessSettings
}
