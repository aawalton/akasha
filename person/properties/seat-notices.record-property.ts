import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const seatNotices = {
  id: "01a16fdf-e6d0-7bd8-8a04-08d4c1d3b2ce",
  type: "page-type/record-property",
  slug: "seat-notices",
  propertySlug: "seat-notices",
  definition: "where a person is told each seat's replies have finished",
  properties: [
    { pageProperty: "text-property/notice-seat", required: true, many: false },
    { pageProperty: "select-property/seat-notice", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person states at most one notice for each seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person stating no notice for a seat is told on the phone and the desktop both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person writes only the notices on their own page, from a seat's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person may write a notice only for a seat answering to that person.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T21:45:07.022Z",
  updatedAt: "2026-10-24T21:45:07.022Z",
} as const satisfies RecordProperty
