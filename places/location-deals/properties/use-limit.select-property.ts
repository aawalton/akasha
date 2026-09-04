import type { SelectProperty } from "@akasha/pages-system/select-property"

export const useLimit = {
  id: "01a06585-5fc5-73dd-8b25-bb4b4eaf5918",
  pageTypeSlug: "select-property",
  slug: "use-limit",
  propertySlug: "use-limit",
  definition: "how many times the offer may be claimed",
  values: ["1", "2", "3", "no-limit"],
} as const satisfies SelectProperty

export type UseLimit = (typeof useLimit.values)[number]
