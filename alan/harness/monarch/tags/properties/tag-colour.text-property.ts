import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const tagColour = {
  id: "01a0680a-1a00-700d-8c31-5d9e4f6a110d",
  type: "text-property",
  slug: "tag-colour",
  propertySlug: "tag-colour",
  definition: "the colour Monarch draws a tag in",
  maxLength: 7,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A colour is six hex digits behind a hash.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
