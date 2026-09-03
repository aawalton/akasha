import type { SelectProperty } from "@akasha/pages-system/select-property"

export const muscleFocus = {
  id: "01a0657e-2bc0-7229-8e6a-9937d7e7b16e",
  pageTypeSlug: "select-property",
  slug: "muscle-focus",
  propertySlug: "muscle-focus",
  definition: "which day of the rotation the movement belongs to",
  values: ["core", "legs", "other", "pull", "push"],
} as const satisfies SelectProperty

export type MuscleFocus = (typeof muscleFocus.values)[number]
