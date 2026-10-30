import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const gripDemand = {
  id: "01a0657e-2bbf-7def-8aa4-63a661a263ff",
  type: "page-type/select-property",
  slug: "grip-demand",
  propertySlug: "grip-demand",
  definition: "how hard a strength exercise works the hands",
  values: ["high", "low", "none"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-10-30T16:52:38.351Z",
} as const satisfies SelectProperty
