import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const coachingScheduleDay = {
  id: "01a0657a-e62d-71ab-9830-6a438684618d",
  type: "page-type",
  slug: "coaching-schedule-day",
  definition: "one day of a training rotation, and what it trains",
  pluralSlug: "coaching-schedule-days",
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
      statement: "A day states the weekday that day falls on and the focus that day trains.",
    },
    {
      invariantKind: "absence",
      statement: "A day names no rotation the day belongs to.",
    },
  ],
  types: "ts",
} as const satisfies PageType
