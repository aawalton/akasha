import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const flexibilityLog = {
  id: "01a06558-36e9-75e2-bcf3-ce91fd6e945b",
  type: "page-type/page-type",
  slug: "flexibility-log",
  definition: "a measurement of how far a joint moved on a day",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/mobility-reading-date",
    "number-property/mobility-reading-value-num",
    "select-property/context",
    "select-property/mobility-reading-metric",
    "select-property/side",
    "text-property/mobility-reading-value-text",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/context", required: true, many: false },
    {
      pageProperty: "calendar-date-property/mobility-reading-date",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/mobility-reading-metric", required: true, many: false },
    { pageProperty: "select-property/side", required: true, many: false },
    {
      pageProperty: "number-property/mobility-reading-value-num",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/mobility-reading-value-text", required: true, many: false },
    { pageProperty: "text-property/note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A reading names no session the reading was taken in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading always has a human read of the measurement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading has a number beside its human read where the metric is measured in numbers.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
