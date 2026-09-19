import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const ram = {
  id: "01a0658c-329a-7300-b922-064842704482",
  type: "page-type/select-property",
  slug: "ram",
  propertySlug: "ram",
  definition: "how much memory it carries",
  values: ["64gb", "16gb", "32gb", "12gb", "128gb"],
  types: "ts",
} as const satisfies SelectProperty
