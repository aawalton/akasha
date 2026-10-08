import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const lifeThemeStatus = {
  id: "01a06575-c2c0-7b91-a932-fc1cef6fd656",
  type: "page-type/select-property",
  slug: "life-theme-status",
  propertySlug: "life-theme-status",
  definition: "how far along a life theme is",
  values: ["up-next", "current-focus", "in-progress", "done"],
  types: "ts",
  createdAt: "2026-09-03T04:10:11.520Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
