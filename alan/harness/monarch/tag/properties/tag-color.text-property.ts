import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const tagColor = {
  id: "01a0680a-1a00-700d-8c31-5d9e4f6a110d",
  type: "page-type/text-property",
  slug: "tag-color",
  propertySlug: "tag-color",
  definition: "the color of a Monarch tag",
  maxLength: 7,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is six hex digits behind a hash.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:11:27.616Z",
  updatedAt: "2026-10-30T15:44:47.308Z",
} as const satisfies TextProperty
