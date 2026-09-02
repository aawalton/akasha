import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { MediaRenderer } from "./media-renderer.text-property.ts"

export type ImageMedia = {
  renderer: MediaRenderer
}

export const imageMedia = {
  id: "01a062b8-8775-7002-af76-179b0e1a6c4c",
  pageTypeSlug: "record-property",
  slug: "image-media",
  propertySlug: "image",
  definition: "the image a page type's pages are rendered as",
  properties: [{ pagePropertySlug: "media-renderer", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An image is rendered from the whole page rather than from one property.",
    },
  ],
} as const satisfies RecordProperty
