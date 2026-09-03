import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { BodyPropertyId } from "./body-property-id.text-property.ts"
import type { ChildCollection } from "./child-collection.record-property.ts"
import type { CollectionHeader } from "./collection-header.record-property.ts"
import type { DetailDisplay } from "./detail-display.text-property.ts"
import type { DetailFrame } from "./detail-frame.record-property.ts"
import type { FullBleed } from "./full-bleed.boolean-property.ts"
import type { LengthPropertyId } from "./length-property-id.text-property.ts"
import type { MarkReadOnEnd } from "./mark-read-on-end.boolean-property.ts"
import type { ProgressPropertyId } from "./progress-property-id.text-property.ts"
import type { ShowReadingProgress } from "./show-reading-progress.boolean-property.ts"

export type DetailConfig = {
  display?: DetailDisplay
  frame?: DetailFrame
  bodyPropertyId?: BodyPropertyId
  fullBleed?: FullBleed
  showReadingProgress?: ShowReadingProgress
  markReadOnEnd?: MarkReadOnEnd
  progressPropertyId?: ProgressPropertyId
  lengthPropertyId?: LengthPropertyId
  header?: CollectionHeader
  childCollection?: ChildCollection
}

export const detailConfig = {
  id: "01a0683a-620a-7046-8715-e1d2a2aa8586",
  pageTypeSlug: "record-property",
  slug: "detail-config",
  propertySlug: "detail-config",
  definition: "how one page of a page type is laid out where that page is read on its own",
  properties: [
    { pagePropertySlug: "detail-display", required: false, many: false },
    { pagePropertySlug: "detail-frame", required: false, many: false },
    { pagePropertySlug: "body-property-id", required: false, many: false },
    { pagePropertySlug: "full-bleed", required: false, many: false },
    { pagePropertySlug: "show-reading-progress", required: false, many: false },
    { pagePropertySlug: "mark-read-on-end", required: false, many: false },
    { pagePropertySlug: "progress-property-id", required: false, many: false },
    { pagePropertySlug: "length-property-id", required: false, many: false },
    { pagePropertySlug: "collection-header", required: false, many: false },
    { pagePropertySlug: "child-collection", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type states here how one of its pages stands on a screen of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating none takes what the page type above states.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with none above it and none of its own is laid out plainly.",
    },
    {
      invariantKind: "departure",
      statement: "A page gathering other pages is laid out by what it gathers.",
    },
  ],
} as const satisfies RecordProperty
