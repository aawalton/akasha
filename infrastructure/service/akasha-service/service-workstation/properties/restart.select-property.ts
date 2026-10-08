import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const restart = {
  id: "01a05a3f-b42e-7f07-a396-69c8d83c02cb",
  type: "page-type/select-property",
  slug: "restart",
  propertySlug: "restart",
  definition: "when a unit is started again after it ends",
  values: ["always", "on-failure"],
  types: "ts",
  createdAt: "2026-08-31T23:55:19.470Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies SelectProperty
