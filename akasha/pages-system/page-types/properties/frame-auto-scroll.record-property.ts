import type { RecordProperty } from "../../record-properties/record-property.page-type.ts"
import type { LoadScroll } from "./load-scroll.text-property.ts"

export type FrameAutoScroll = {
  loadScroll?: LoadScroll
}

export const frameAutoScroll = {
  id: "01a0683a-620a-738e-922d-fa0b734ddda1",
  pageTypeSlug: "record-property",
  slug: "frame-auto-scroll",
  propertySlug: "auto-scroll",
  definition: "where a page is carried to on its own rather than by the reader's hand",
  properties: [{ pagePropertySlug: "load-scroll", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is carried on its own only as the page opens.",
    },
  ],
} as const satisfies RecordProperty
