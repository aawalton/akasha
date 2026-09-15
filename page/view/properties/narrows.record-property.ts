import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const narrows = {
  id: "01a063ee-2a3b-732c-983b-68ef37a472f5",
  type: "page-type/record-property",
  slug: "narrows",
  propertySlug: "narrows",
  definition: "what a query tests a page against, each with the key tested and how",
  properties: [
    { pageProperty: "text-property/narrow-key", required: true, many: false },
    { pageProperty: "select-property/narrow-comparison", required: true, many: false },
    { pageProperty: "text-property/narrow-values", required: true, many: true, maxCount: 20 },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is answered where the page passes every narrow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A query stating no narrow asks of every page of its type and of every type extending that type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two narrows on one key are two entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow a query cannot read is refused rather than dropped.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
