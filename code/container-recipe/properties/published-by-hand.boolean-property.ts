import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const publishedByHand = {
  id: "01a17c95-ed3b-7fd9-b985-958adb6d2c0e",
  type: "page-type/boolean-property",
  slug: "published-by-hand",
  propertySlug: "published-by-hand",
  definition: "whether a recipe's image is published only when a deploy names that recipe",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe published by hand is deployed by nothing on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A manifest naming such an image pulls the tag it names and builds nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T08:59:22.810Z",
  updatedAt: "2026-10-27T08:59:22.810Z",
} as const satisfies BooleanProperty
