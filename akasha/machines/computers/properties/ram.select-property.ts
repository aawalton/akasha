import type { SelectProperty } from "@akasha/pages-system/select-property"

export const ram = {
  id: "01a0658c-329a-7300-b922-064842704482",
  pageTypeSlug: "select-property",
  slug: "ram",
  propertySlug: "ram",
  definition: "how much memory it carries",
  values: ["64gb", "16gb", "32gb", "12gb"],
} as const satisfies SelectProperty

export type Ram = (typeof ram.values)[number]
