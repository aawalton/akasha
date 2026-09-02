import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type MediaRenderer = string

export const mediaRenderer = {
  id: "01a062b8-8775-7003-b1df-c7f935fcacbf",
  pageTypeSlug: "text-property",
  slug: "media-renderer",
  propertySlug: "renderer",
  definition: "the model that makes a page type's audio or image",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A renderer is named here and reached by the code that knows the name.",
    },
  ],
} as const satisfies TextProperty
