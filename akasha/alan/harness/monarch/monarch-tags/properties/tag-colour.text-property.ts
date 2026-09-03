import type { TextProperty } from "@akasha/pages-system/text-property"

export type TagColour = string

export const tagColour = {
  id: "01a0680a-1a00-700d-8c31-5d9e4f6a110d",
  pageTypeSlug: "text-property",
  slug: "tag-colour",
  propertySlug: "tag-colour",
  definition: "the colour Monarch draws a tag in",
  max: 7,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A colour is six hex digits behind a hash.",
    },
  ],
} as const satisfies TextProperty
