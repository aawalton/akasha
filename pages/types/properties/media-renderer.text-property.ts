import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const mediaRenderer = {
  id: "01a062b8-8775-7003-b1df-c7f935fcacbf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "media-renderer",
  propertySlug: "renderer",
  definition: "the model that makes a page type's audio or image",
  maxLength: 64,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A renderer is named here and reached by the code that knows the name.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
