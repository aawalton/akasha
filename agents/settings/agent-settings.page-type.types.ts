import type { HarnessSettings } from "akasha/agents/settings/properties/harness-settings.file-property.types.ts"
import type { Telling } from "akasha/agents/settings/properties/telling.module-property-group.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type AgentSettings = Domain & {
  harnessSettings: HarnessSettings
  telling?: Telling
}
