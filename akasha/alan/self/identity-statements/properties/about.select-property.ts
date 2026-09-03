import type { SelectProperty } from "@akasha/pages-system/select-property"

export const about = {
  id: "01a06589-d12a-7621-8392-7ad8483de617",
  pageTypeSlug: "select-property",
  slug: "about",
  propertySlug: "about",
  definition: "what the statement is about",
  values: ["myself", "others", "reality"],
} as const satisfies SelectProperty

export type About = (typeof about.values)[number]
