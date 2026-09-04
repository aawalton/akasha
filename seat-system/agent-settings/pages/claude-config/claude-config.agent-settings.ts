import type { AgentSettings } from "../../agent-settings.page-type.ts"

export const claudeConfig = {
  id: "01a0657b-ad40-7afc-9f98-df4a0505555b",
  pageTypeSlug: "agent-settings",
  slug: "claude-config",
  definition: "which checkouts the client has been trusted with",
  harnessSettings: "json",
} as const satisfies AgentSettings
