import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mediaVariantAxis = {
  id: "01a062b8-8775-7005-bf65-1446f2feb5d3",
  type: "page-type/text-property",
  slug: "media-variant-axis",
  propertySlug: "variant-axis",
  definition: "what a page's audio is rendered once per, so a page has several renditions",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type naming no axis has one rendition of each page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
