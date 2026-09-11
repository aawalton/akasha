import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const imageMedia = {
  id: "01a062b8-8775-7002-af76-179b0e1a6c4c",
  type: "record-property",
  slug: "image-media",
  propertySlug: "image",
  definition: "the image a page type's pages are rendered as",
  properties: [{ pageProperty: "text-property/media-renderer", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image is rendered from the whole page rather than from one property.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
