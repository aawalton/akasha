import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const itemLevel = {
  id: "01a05fcc-41f3-75f3-b81e-993d8b24e369",
  type: "page-type/text-property",
  slug: "item-level",
  propertySlug: "level",
  definition: "an item's character level",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level reading Scaled follows the character with the item.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
