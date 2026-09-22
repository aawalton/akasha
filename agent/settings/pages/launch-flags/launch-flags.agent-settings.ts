import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const launchFlags = {
  id: "01a0657b-ad40-7216-8ef6-8986aaba140c",
  type: "page-type/agent-settings",
  slug: "launch-flags",
  definition: "the flags launching the client",
  harnessSettings: "json",
} as const satisfies AgentSettings
