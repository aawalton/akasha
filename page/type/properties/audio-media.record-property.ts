import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const audioMedia = {
  id: "01a062b8-8775-7001-8dc5-cf2cfeb779b3",
  type: "page-type/record-property",
  slug: "audio-media",
  propertySlug: "audio",
  definition: "the audio a page type's pages are rendered as, and its source",
  properties: [
    { pageProperty: "text-property/media-source-property-id", required: true, many: false },
    { pageProperty: "text-property/media-renderer", required: true, many: false },
    { pageProperty: "text-property/media-variant-axis", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Audio is rendered from one property the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type saying its pages have audio names the property the audio is made from.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T15:24:15.605Z",
  updatedAt: "2026-09-22T13:59:59.000Z",
} as const satisfies RecordProperty
