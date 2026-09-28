import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coordinatorAgent = {
  id: "01a0673c-8e0e-7001-a960-de2ffa854884",
  type: "page-type/text-property",
  slug: "coordinator-agent",
  propertySlug: "coordinator-agent",
  definition: "the seat that runs a story",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story names the seat that runs the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat running a story played runs the side Alan does not play.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
