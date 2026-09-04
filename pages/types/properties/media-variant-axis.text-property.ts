import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type MediaVariantAxis = string

export const mediaVariantAxis = {
  id: "01a062b8-8775-7005-bf65-1446f2feb5d3",
  pageTypeSlug: "text-property",
  slug: "media-variant-axis",
  propertySlug: "variant-axis",
  definition: "what a page's audio is rendered once per, so one page holds several renditions",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type naming no axis has one rendition of each page.",
    },
  ],
} as const satisfies TextProperty
