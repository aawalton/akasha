import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const direction = {
  id: "01a0a5e2-270a-7e0a-8a1d-0d7ae58c26f5",
  type: "page-type/text-property",
  slug: "direction",
  propertySlug: "direction",
  definition: "the way along an edge a predicate follows that edge",
  maxLength: 3,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge followed to the node it reaches is followed out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge followed to the node it comes from is followed in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-15T16:24:16.906Z",
  updatedAt: "2026-09-25T16:27:50.000Z",
} as const satisfies TextProperty
