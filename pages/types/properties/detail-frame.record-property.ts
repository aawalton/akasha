import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const detailFrame = {
  id: "01a0683a-620a-721f-ac05-27b2bc929afe",
  pageTypeSlug: "record-property",
  type: "record-property",
  slug: "detail-frame",
  propertySlug: "frame",
  definition: "how the screen around a page's body behaves while the page is read",
  properties: [
    { pageProperty: "boolean-property/frame-edge-to-edge", required: false, many: false },
    { pageProperty: "boolean-property/frame-focus-mode", required: false, many: false },
    { pageProperty: "record-property/frame-auto-scroll", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A frame says nothing about the body the frame stands around.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating no frame is read in the frame every page is read in.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
