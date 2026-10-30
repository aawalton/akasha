import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const agents = {
  id: "01a0657b-ad40-75af-a0a6-bb09331fb95c",
  type: "page-type/agent-settings",
  slug: "agents",
  definition: "the config Claude Code reads for every agent",
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
  updatedAt: "2026-10-30T14:42:36.114Z",
} as const satisfies AgentSettings
