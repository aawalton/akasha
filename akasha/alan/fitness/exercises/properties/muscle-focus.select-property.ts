import type { SelectProperty } from "@akasha/pages-system/select-property"

export const muscleFocus = {
  id: "01a0657b-1ad2-7a85-b37c-497ab521ae05",
  pageTypeSlug: "select-property",
  slug: "muscle-focus",
  propertySlug: "muscle-focus",
  definition: "which day of the rotation the movement belongs to",
  values: ["core", "legs", "other", "pull", "push"],
} as const satisfies SelectProperty

export type MuscleFocus = (typeof muscleFocus.values)[number]
