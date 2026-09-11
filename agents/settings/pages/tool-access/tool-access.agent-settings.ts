import type { AgentSettings } from "akasha/agents/settings/agent-settings.page-type.types.ts"

export const toolAccess = {
  id: "01a0657b-ad40-7a30-a01e-7d2c05b081b3",
  type: "agent-settings",
  slug: "tool-access",
  definition: "which built-in tools an agent may reach",
  harnessSettings: "json",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tool whose only act is writing a file is reached by no agent.",
    },
  ],
} as const satisfies AgentSettings
