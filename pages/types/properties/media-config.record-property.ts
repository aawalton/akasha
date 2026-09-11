import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const mediaConfig = {
  id: "01a062b8-8775-7000-98df-e9b05641a5fe",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "media-config",
  propertySlug: "media-config",
  definition: "how a page type's pages are rendered as audio and as an image",
  properties: [
    { pageProperty: "record-property/audio-media", required: false, many: false },
    { pageProperty: "record-property/image-media", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type states here how its pages are rendered as media.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type stating no media config takes the media config the page type above states.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no media config here or above renders no media.",
    },
    {
      invariantKind: "departure",
      statement: "A page type rendering no media is served by no media route.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
