import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { FrameAutoScroll } from "./frame-auto-scroll.record-property.ts"
import type { FrameEdgeToEdge } from "./frame-edge-to-edge.boolean-property.ts"
import type { FrameFocusMode } from "./frame-focus-mode.boolean-property.ts"

export type DetailFrame = {
  edgeToEdge?: FrameEdgeToEdge
  focusMode?: FrameFocusMode
  autoScroll?: FrameAutoScroll
}

export const detailFrame = {
  id: "01a0683a-620a-721f-ac05-27b2bc929afe",
  pageTypeSlug: "record-property",
  slug: "detail-frame",
  propertySlug: "frame",
  definition: "how the screen around a page's body behaves while the page is read",
  properties: [
    { pagePropertySlug: "frame-edge-to-edge", required: false, many: false },
    { pagePropertySlug: "frame-focus-mode", required: false, many: false },
    { pagePropertySlug: "frame-auto-scroll", required: false, many: false },
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
} as const satisfies RecordProperty
