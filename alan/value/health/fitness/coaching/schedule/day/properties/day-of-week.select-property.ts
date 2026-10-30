import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const dayOfWeek = {
  id: "01a0657a-e62d-7e2c-96f2-7108ef5b0bf1",
  type: "page-type/select-property",
  slug: "day-of-week",
  propertySlug: "day-of-week",
  definition: "the day of the week of a day in Alan's schedule",
  values: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
  types: "ts",
  createdAt: "2026-09-03T04:15:48.269Z",
  updatedAt: "2026-10-30T16:56:16.080Z",
} as const satisfies SelectProperty
