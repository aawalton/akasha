import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const agent = {
  id: "01a082e0-d19a-7472-8445-857aa2d33d92",
  type: "page-type/namespace",
  slug: "agent",
  definition: "the agents at work and the pages each one has",
  parts: [
    "command/agent-strays",
    "command/agent-subagent-stop",
    "command/agent-subagent-sweep",
    "command/agent-turn-color-list",
  ],
  name: "agent",
  createdAt: "2026-09-08T21:16:06.938Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
