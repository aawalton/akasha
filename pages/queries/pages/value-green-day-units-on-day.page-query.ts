import type { PageQuery } from "../page-query.page-type.ts"

export const valueGreenDayUnitsOnDay = {
  id: "01a063f9-220d-75c2-857e-318f24174e26",
  pageTypeSlug: "page-query",
  slug: "value-green-day-units-on-day",
  asksOfSlug: "persona-day",
  parameters: [
    { name: "date", type: "calendar-date" },
    { name: "value", type: "text" },
  ],
  narrows: [
    { key: "date", comparison: "is", values: ["$date"] },
    { key: "valueSlug", comparison: "is", values: ["$value"] },
  ],
  reduction: "sum",
  targetKey: "greenDayRung",
} as const satisfies PageQuery
