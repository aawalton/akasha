import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const agent = {
  id: "01a082e0-d19a-7472-8445-857aa2d33d92",
  type: "namespace",
  slug: "agent",
  definition: "the agents at work and the pages each one has",
  parts: ["command/agent-subagent-sweep", "command/agent-forest", "command/agent-turn-colors"],
  name: "agent",
} as const satisfies Namespace
