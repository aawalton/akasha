import type { AgentSettings } from "../../agent-settings.page-type.ts"

export const launchFlags = {
  id: "01a0657b-ad40-7216-8ef6-8986aaba140c",
  pageTypeSlug: "agent-settings",
  slug: "launch-flags",
  definition: "the flags the client is launched with",
  harnessSettings: "json",
} as const satisfies AgentSettings
