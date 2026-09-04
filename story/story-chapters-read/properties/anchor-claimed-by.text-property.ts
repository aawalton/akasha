import type { TextProperty } from "@akasha/pages-system/text-property"

export type AnchorClaimedBy = string

export const anchorClaimedBy = {
  id: "01a0685e-ef8a-79db-8377-e5f878c0cb0c",
  pageTypeSlug: "text-property",
  slug: "anchor-claimed-by",
  propertySlug: "claimed-by",
  definition: "who in the story said the anchor",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor the story itself tells names nobody here.",
    },
  ],
} as const satisfies TextProperty
