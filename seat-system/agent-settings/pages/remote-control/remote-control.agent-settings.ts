import type { AgentSettings } from "../../agent-settings.page-type.ts"

export const remoteControl = {
  id: "01a0657b-ad40-7fe7-b386-20d7f0224102",
  pageTypeSlug: "agent-settings",
  slug: "remote-control",
  definition: "the scopes remote control falls back on",
  harnessSettings: "json",
} as const satisfies AgentSettings
