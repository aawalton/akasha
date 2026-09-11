import type { AgentSettings } from "akasha/seat-system/agent-settings/agent-settings.page-type.types.ts"

export const agents = {
  id: "01a0657b-ad40-75af-a0a6-bb09331fb95c",
  pageTypeSlug: "agent-settings",
  type: "agent-settings",
  slug: "agents",
  definition: "what every agent on this workstation is spawned with",
  harnessSettings: "json",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bash environment and the statusline are resolved by akasha rather than here.",
    },
  ],
} as const satisfies AgentSettings
