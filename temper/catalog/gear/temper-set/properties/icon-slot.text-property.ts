import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const iconSlot = {
  id: "01a05fd1-d43b-783e-b447-1fb92ded8285",
  type: "page-type/text-property",
  slug: "icon-slot",
  propertySlug: "slot",
  definition: "the piece for which an icon is shown",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A star after a colon covers every weight of that piece.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
