import type { SelectProperty } from "@akasha/pages-system/select-property"

export const computerStatus = {
  id: "01a0658c-329a-7a34-a07d-25a81f30954a",
  pageTypeSlug: "select-property",
  slug: "computer-status",
  propertySlug: "computer-status",
  definition: "where it stands in Alan's hands",
  values: ["active", "needs-repair", "prepare-to-sell", "listed", "sold", "in-storage", "option"],
} as const satisfies SelectProperty

export type ComputerStatus = (typeof computerStatus.values)[number]
