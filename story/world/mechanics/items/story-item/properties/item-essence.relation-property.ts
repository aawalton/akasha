import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemEssence = {
  id: "01a0d428-fd14-7aa0-8b01-dea9a57171d4",
  type: "page-type/relation-property",
  slug: "item-essence",
  propertySlug: "essence",
  definition: "the element of the essence an item carries",
  targetPageType: "page-type/world-element",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item carrying no essence names no element.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T16:04:11.156Z",
  updatedAt: "2026-09-26T17:47:23.000Z",
} as const satisfies RelationProperty
