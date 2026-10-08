import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const calendarDateProperty = {
  id: "01a063de-2c60-7001-89b5-5efdc8482d83",
  type: "page-type/page-type",
  slug: "calendar-date-property",
  definition: "a page property with a day",
  icon: "calendar",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is written as an ISO 8601 calendar day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A day has no hour.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A day has no zone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A moment within a day is an instant property rather than a calendar date property.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-09-24T19:54:52.000Z",
} as const satisfies PageType
