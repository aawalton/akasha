import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const claudeConfig = {
  id: "01a0657b-ad40-7afc-9f98-df4a0505555b",
  type: "page-type/agent-settings",
  slug: "claude-config",
  definition: "the checkouts trusted to the client",
  harnessSettings: "json",
} as const satisfies AgentSettings
