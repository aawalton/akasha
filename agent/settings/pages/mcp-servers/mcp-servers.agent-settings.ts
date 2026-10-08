import type { AgentSettings } from "akasha/agent/settings/agent-settings.page-type.types.ts"

export const mcpServers = {
  id: "01a0657b-ad40-7e45-b0c2-fbd79f5a4b35",
  type: "page-type/agent-settings",
  slug: "mcp-servers",
  definition: "the tool servers the client is given",
  harnessSettings: "json",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A `.mcp.json` beside an account or a workspace is never read.",
    },
  ],
  createdAt: "2026-09-03T04:16:39.232Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies AgentSettings
