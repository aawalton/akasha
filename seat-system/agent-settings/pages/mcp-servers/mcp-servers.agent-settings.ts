import type { AgentSettings } from "../../agent-settings.page-type.ts"

export const mcpServers = {
  id: "01a0657b-ad40-7e45-b0c2-fbd79f5a4b35",
  pageTypeSlug: "agent-settings",
  slug: "mcp-servers",
  definition: "the tool servers the client is given",
  harnessSettings: "json",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A `.mcp.json` beside an account or a workspace is never read.",
    },
  ],
} as const satisfies AgentSettings
