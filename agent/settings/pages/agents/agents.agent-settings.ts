import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const agents = {
  id: "01a0657b-ad40-75af-a0a6-bb09331fb95c",
  type: "page-type/agent-settings",
  slug: "agents",
  definition: "what spawns every agent on this workstation",
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
  createdAt: "2026-09-03T04:16:39.232Z",
  updatedAt: "2026-09-22T13:42:40.000Z",
} as const satisfies AgentSettings
