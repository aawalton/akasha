import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const id = {
  id: "01a049b9-856c-7ee7-b958-f63eead00582",
  type: "page-type/text-property",
  slug: "id",
  propertySlug: "id",
  definition: "the identity a page keeps for its whole life",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  unique: "unique-kind/page",
  generator: "generator-kind/uuid-v7",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page being created states no id of its own.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
