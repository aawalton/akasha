import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const carriedEffect = {
  id: "01a08ece-d396-7735-b4e0-bbe153126211",
  type: "page-type/one-of-property",
  slug: "carried-effect",
  propertySlug: "effect",
  definition: "what an effect carries, as an inner effect or as a named act",
  members: ["record-property/nested-effect", "relation-property/special-effect"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect that delays or repeats carries its inner effect here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect naming a special act names that act here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which of the two an effect carries follows from the kind that effect names.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
