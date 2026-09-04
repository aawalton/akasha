import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { AudioMedia } from "./audio-media.record-property.ts"
import type { ImageMedia } from "./image-media.record-property.ts"

export type MediaConfig = {
  audio?: AudioMedia
  image?: ImageMedia
}

export const mediaConfig = {
  id: "01a062b8-8775-7000-98df-e9b05641a5fe",
  pageTypeSlug: "record-property",
  slug: "media-config",
  propertySlug: "media-config",
  definition: "how a page type's pages are rendered as audio and as an image",
  properties: [
    { pagePropertySlug: "audio-media", required: false, many: false },
    { pagePropertySlug: "image-media", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type states here how its pages are rendered as media.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating none takes what the page type above states.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with none above it and none of its own renders no media.",
    },
    {
      invariantKind: "departure",
      statement: "A page type rendering no media is served by no media route.",
    },
  ],
} as const satisfies RecordProperty
