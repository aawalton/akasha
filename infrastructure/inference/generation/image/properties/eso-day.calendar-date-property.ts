import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const esoDay = {
  id: "01a0cb48-cf03-73d0-8a9e-fe6422c89f59",
  type: "page-type/calendar-date-property",
  slug: "eso-day",
  propertySlug: "eso-day",
  definition: "a record's ESO day",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ESO day runs from six in the morning to six the next morning.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-22T22:42:21.571Z",
  updatedAt: "2026-09-22T22:42:49.000Z",
} as const satisfies CalendarDateProperty
