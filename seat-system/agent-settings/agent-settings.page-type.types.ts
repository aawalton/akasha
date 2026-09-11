import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { HarnessSettings } from "akasha/seat-system/agent-settings/properties/harness-settings.file-property.types.ts"
import type { Telling } from "akasha/seat-system/agent-settings/properties/telling.module-property-group.ts"

export type AgentSettings = Domain & {
  harnessSettings: HarnessSettings
  telling?: Telling
}
