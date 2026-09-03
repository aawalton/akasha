import type { SelectProperty } from "@akasha/pages-system/select-property"

export const about = {
  id: "01a06575-c2b8-7612-809c-128df0bd7987",
  pageTypeSlug: "select-property",
  slug: "about",
  propertySlug: "about",
  definition: "what the statement is about",
  values: ["myself", "others", "reality"],
} as const satisfies SelectProperty

export type About = (typeof about.values)[number]
