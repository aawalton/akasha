import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const agentId = {
  id: "01a062c8-99b7-7bd3-91ac-676da441cf14",
  type: "page-type/text-property",
  slug: "agent-id",
  propertySlug: "agent-id",
  definition: "an agent's id",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent id reaches the page whose readings are that agent's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent's agent id joins its seat's id to the id the subagent runs under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two hyphens part the seat's id from the id the subagent runs under.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
