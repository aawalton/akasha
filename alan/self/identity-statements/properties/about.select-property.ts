import type { SelectProperty } from "@akasha/pages-system/select-property"

export const about = {
  id: "01a0658a-739f-7163-8cca-6370b5500c7f",
  pageTypeSlug: "select-property",
  slug: "about",
  propertySlug: "about",
  definition: "what the statement is about",
  values: ["myself", "others", "reality"],
} as const satisfies SelectProperty

export type About = (typeof about.values)[number]
