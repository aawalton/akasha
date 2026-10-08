import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const imageMedia = {
  id: "01a062b8-8775-7002-af76-179b0e1a6c4c",
  type: "page-type/record-property",
  slug: "image-media",
  propertySlug: "image",
  definition: "the image a page type's pages are rendered as",
  properties: [{ pageProperty: "text-property/media-renderer", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image is rendered from the whole page rather than from one property.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T15:24:15.605Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RecordProperty
