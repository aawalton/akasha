import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const displayRefreshRate = {
  id: "01a0658c-329a-7c80-9052-089c4feb898c",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "display-refresh-rate",
  propertySlug: "display-refresh-rate",
  definition: "how often that monitor redraws",
  values: ["50-hz", "120-hz", "60-hz"],
  types: "ts",
} as const satisfies SelectProperty
