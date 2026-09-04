import type { AgentSettings } from "../../agent-settings.page-type.ts"

export const agents = {
  id: "01a0657b-ad40-75af-a0a6-bb09331fb95c",
  pageTypeSlug: "agent-settings",
  slug: "agents",
  definition: "what every agent on this workstation is spawned with",
  harnessSettings: "json",
} as const satisfies AgentSettings
