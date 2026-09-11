import type { harnessSettings } from "akasha/seat-system/agent-settings/properties/harness-settings.file-property.ts"

export type HarnessSettings = (typeof harnessSettings.extensions)[number]
