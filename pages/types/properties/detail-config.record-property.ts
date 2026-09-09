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
    { pageProperty: "text-property/detail-display", required: false, many: false },
    { pageProperty: "record-property/detail-frame", required: false, many: false },
    { pageProperty: "text-property/body-property-id", required: false, many: false },
    { pageProperty: "boolean-property/full-bleed", required: false, many: false },
    { pageProperty: "boolean-property/show-reading-progress", required: false, many: false },
    { pageProperty: "boolean-property/mark-read-on-end", required: false, many: false },
    { pageProperty: "text-property/progress-property-id", required: false, many: false },
    { pageProperty: "text-property/length-property-id", required: false, many: false },
    { pageProperty: "record-property/collection-header", required: false, many: false },
    { pageProperty: "record-property/child-collection", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type states here how a page of that type is laid out on a screen of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type stating no detail config takes the layout the page type above states.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no detail config here or above is laid out plainly.",
    },
    {
      invariantKind: "departure",
      statement: "A page gathering other pages is laid out by the pages that page gathers.",
    },
  ],
} as const satisfies RecordProperty
