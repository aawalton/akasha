import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemSlot = {
  id: "01a0ca45-cc74-7097-84c6-4205dbdaeff1",
  type: "page-type/relation-property",
  slug: "item-slot",
  propertySlug: "slot",
  definition: "the place on a character an item is worn",
  targetPageType: "page-type/item-slot",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item naming no slot is carried rather than worn.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
