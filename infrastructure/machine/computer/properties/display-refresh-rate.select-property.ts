import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const displayRefreshRate = {
  id: "01a0658c-329a-7c80-9052-089c4feb898c",
  type: "page-type/select-property",
  slug: "display-refresh-rate",
  propertySlug: "display-refresh-rate",
  definition: "how often that monitor redraws",
  values: ["50-hz", "120-hz", "60-hz"],
  types: "ts",
  createdAt: "2026-09-03T04:34:41.946Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
