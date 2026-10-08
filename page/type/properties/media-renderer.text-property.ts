import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mediaRenderer = {
  id: "01a062b8-8775-7003-b1df-c7f935fcacbf",
  type: "page-type/text-property",
  slug: "media-renderer",
  propertySlug: "renderer",
  definition: "the model that makes a page type's audio or image",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A renderer is named here and reached by the code that knows the name.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T15:24:15.605Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
