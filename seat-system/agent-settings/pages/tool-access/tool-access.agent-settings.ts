import type { AgentSettings } from "../../agent-settings.page-type.ts"

export const toolAccess = {
  id: "01a0657b-ad40-7a30-a01e-7d2c05b081b3",
  pageTypeSlug: "agent-settings",
  slug: "tool-access",
  definition: "which built-in tools an agent may reach",
  harnessSettings: "json",
} as const satisfies AgentSettings
