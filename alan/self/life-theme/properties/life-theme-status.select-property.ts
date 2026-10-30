import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const lifeThemeStatus = {
  id: "01a06575-c2c0-7b91-a932-fc1cef6fd656",
  type: "page-type/select-property",
  slug: "life-theme-status",
  propertySlug: "life-theme-status",
  definition: "the progress of a life theme",
  values: ["up-next", "current-focus", "in-progress", "done"],
  types: "ts",
  createdAt: "2026-09-03T04:10:11.520Z",
  updatedAt: "2026-10-30T16:28:45.278Z",
} as const satisfies SelectProperty
