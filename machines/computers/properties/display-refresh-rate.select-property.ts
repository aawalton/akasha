import type { SelectProperty } from "@akasha/pages-system/select-property"

export const displayRefreshRate = {
  id: "01a0658c-329a-7c80-9052-089c4feb898c",
  pageTypeSlug: "select-property",
  slug: "display-refresh-rate",
  propertySlug: "display-refresh-rate",
  definition: "how often that monitor redraws",
  values: ["50-hz", "120-hz", "60-hz"],
} as const satisfies SelectProperty

export type DisplayRefreshRate = (typeof displayRefreshRate.values)[number]
