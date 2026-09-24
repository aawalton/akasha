import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const calendarTimeProperty = {
  id: "01a06d87-9d4d-7c65-aad0-8a0385b221c6",
  type: "page-type/page-type",
  slug: "calendar-time-property",
  definition: "a page property with a time of day",
  icon: "clock",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A time of day is written as an ISO 8601 wall time to the minute.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A time of day has no day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A time of day has no zone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A moment on a stated day is an instant property rather than a calendar time property.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
