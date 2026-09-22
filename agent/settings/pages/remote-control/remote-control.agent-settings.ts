import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const remoteControl = {
  id: "01a0657b-ad40-7fe7-b386-20d7f0224102",
  type: "page-type/agent-settings",
  slug: "remote-control",
  definition: "remote control's fallback scopes",
  harnessSettings: "json",
} as const satisfies AgentSettings
