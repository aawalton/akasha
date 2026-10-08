import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const computerStatus = {
  id: "01a0658c-329a-7a34-a07d-25a81f30954a",
  type: "page-type/select-property",
  slug: "computer-status",
  propertySlug: "computer-status",
  definition: "where it is in Alan's hands",
  values: ["active", "needs-repair", "prepare-to-sell", "listed", "sold", "in-storage", "option"],
  types: "ts",
  createdAt: "2026-09-03T04:34:41.946Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
