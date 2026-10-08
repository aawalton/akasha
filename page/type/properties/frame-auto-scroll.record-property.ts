import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const frameAutoScroll = {
  id: "01a0683a-620a-738e-922d-fa0b734ddda1",
  type: "page-type/record-property",
  slug: "frame-auto-scroll",
  propertySlug: "auto-scroll",
  definition: "where a page is carried to on its own rather than by the reader's hand",
  properties: [{ pageProperty: "text-property/load-scroll", required: false, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is carried on its own only as the page opens.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:04:11.786Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RecordProperty
