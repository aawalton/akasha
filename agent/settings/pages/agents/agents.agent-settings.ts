import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const agents = {
  id: "01a0657b-ad40-75af-a0a6-bb09331fb95c",
  type: "page-type/agent-settings",
  slug: "agents",
  definition: "what every agent on this workstation is spawned with",
  harnessSettings: "json",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bash environment and the statusline are resolved by akasha rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat has no agent view, so nothing moves that seat into the background.",
    },
  ],
} as const satisfies AgentSettings
