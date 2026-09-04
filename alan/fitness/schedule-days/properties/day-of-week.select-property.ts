import type { SelectProperty } from "@akasha/pages-system/select-property"

export const dayOfWeek = {
  id: "01a0657a-e62d-7e2c-96f2-7108ef5b0bf1",
  pageTypeSlug: "select-property",
  slug: "day-of-week",
  propertySlug: "day-of-week",
  definition: "which day of the week this one falls on",
  values: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
} as const satisfies SelectProperty

export type DayOfWeek = (typeof dayOfWeek.values)[number]
