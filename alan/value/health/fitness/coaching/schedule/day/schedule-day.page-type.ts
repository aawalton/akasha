import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const scheduleDay = {
  id: "01a0657a-e62d-71ab-9830-6a438684618d",
  type: "page-type/page-type",
  slug: "schedule-day",
  definition: "one day of a training rotation, and what it trains",
  extends: ["page-type/page"],
  parts: ["select-property/day-of-week", "select-property/focus"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/day-of-week", required: true, many: false },
    { pageProperty: "select-property/focus", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day states the weekday that day falls on and the focus that day trains.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A day names no rotation the day belongs to.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
