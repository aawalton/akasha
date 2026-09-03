import type { SelectProperty } from "@akasha/pages-system/select-property"

export const lifeThemeStatus = {
  id: "01a06575-c2c0-7b91-a932-fc1cef6fd656",
  pageTypeSlug: "select-property",
  slug: "life-theme-status",
  propertySlug: "life-theme-status",
  definition: "how far along a life theme is",
  values: ["up-next", "current-focus", "in-progress", "done"],
} as const satisfies SelectProperty

export type LifeThemeStatus = (typeof lifeThemeStatus.values)[number]
