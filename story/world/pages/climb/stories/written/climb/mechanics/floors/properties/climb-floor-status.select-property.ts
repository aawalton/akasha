import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const climbFloorStatus = {
  id: "01a0f953-d88d-76ca-b37e-08cd660fcf09",
  type: "page-type/select-property",
  slug: "climb-floor-status",
  propertySlug: "status",
  definition: "whether a floor's task is still open or met",
  values: ["active", "complete"],
  types: "ts",
} as const satisfies SelectProperty
