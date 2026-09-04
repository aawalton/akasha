import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { MediaRenderer } from "./media-renderer.text-property.ts"
import type { MediaSourcePropertyId } from "./media-source-property-id.text-property.ts"
import type { MediaVariantAxis } from "./media-variant-axis.text-property.ts"

export type AudioMedia = {
  sourcePropertyId: MediaSourcePropertyId
  renderer: MediaRenderer
  variantAxis?: MediaVariantAxis
}

export const audioMedia = {
  id: "01a062b8-8775-7001-8dc5-cf2cfeb779b3",
  pageTypeSlug: "record-property",
  slug: "audio-media",
  propertySlug: "audio",
  definition: "the audio a page type's pages are rendered as, and what it is rendered from",
  properties: [
    { pagePropertySlug: "media-source-property-id", required: true, many: false },
    { pagePropertySlug: "media-renderer", required: true, many: false },
    { pagePropertySlug: "media-variant-axis", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Audio is rendered from one property the page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A page type saying its pages have audio says what the audio is made from.",
    },
  ],
} as const satisfies RecordProperty
