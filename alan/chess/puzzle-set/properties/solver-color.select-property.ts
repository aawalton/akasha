import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const solverColor = {
  id: "01a06582-bd62-77f7-a5a9-76e438a7c6ff",
  type: "page-type/select-property",
  slug: "solver-color",
  propertySlug: "solver-color",
  definition: "the pieces the player of a puzzle moves",
  values: ["white", "black"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-10-30T15:11:20.256Z",
} as const satisfies SelectProperty
