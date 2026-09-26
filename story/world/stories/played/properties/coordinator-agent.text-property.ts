import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coordinatorAgent = {
  id: "01a0673c-8e0e-7001-a960-de2ffa854884",
  type: "page-type/text-property",
  slug: "coordinator-agent",
  propertySlug: "coordinator-agent",
  definition: "the agent running the game master's side",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played names the agent running the side Alan does not play.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
