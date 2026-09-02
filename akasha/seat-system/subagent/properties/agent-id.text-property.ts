import type { TextProperty } from "@akasha/pages-system/text-property"

export type AgentId = string

export const agentId = {
  id: "01a062c8-99b7-7bd3-91ac-676da441cf14",
  pageTypeSlug: "text-property",
  slug: "agent-id",
  propertySlug: "agent-id",
  definition: "the id an agent acts under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent id names the folder an agent's readings are kept in.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's agent id joins its seat's id to the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement: "Two hyphens part the seat's id from the id the subagent runs under.",
    },
  ],
} as const satisfies TextProperty
