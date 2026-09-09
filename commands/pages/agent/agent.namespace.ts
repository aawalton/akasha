import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const agent = {
  id: "01a082e0-d19a-7472-8445-857aa2d33d92",
  pageTypeSlug: "namespace",
  slug: "agent",
  definition: "the agents at work and the pages each one has",
  parts: ["command/agent-subagent-sweep", "command/agent-forest"],
} as const satisfies Namespace
