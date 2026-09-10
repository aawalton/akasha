import type { PageType } from "@akasha/pages/page-type"

export const scheduleDay = {
  id: "01a0657a-e62d-71ab-9830-6a438684618d",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "schedule-day",
  definition: "one day of a training rotation, and what it trains",
  pluralSlug: "schedule-days",
  extends: ["page-type/page"],
  parts: ["select-property/day-of-week", "select-property/focus"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/day-of-week", required: true, many: false },
    { pageProperty: "select-property/focus", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day states the weekday that day falls on and what that day trains.",
    },
    {
      invariantKind: "absence",
      statement: "A day names no rotation the day belongs to.",
    },
  ],
  types: "ts",
} as const satisfies PageType
