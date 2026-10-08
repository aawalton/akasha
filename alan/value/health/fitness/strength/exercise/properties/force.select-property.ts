import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const force = {
  id: "01a0657e-2bbf-7e84-8d89-c9451bbec33a",
  type: "page-type/select-property",
  slug: "force",
  propertySlug: "force",
  definition: "which way the movement drives the load",
  values: ["pull", "push", "static"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
