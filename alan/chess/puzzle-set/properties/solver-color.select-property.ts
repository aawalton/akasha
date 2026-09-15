import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const solverColor = {
  id: "01a06582-bd62-77f7-a5a9-76e438a7c6ff",
  type: "select-property",
  slug: "solver-color",
  propertySlug: "solver-color",
  definition: "which side the solver moves",
  values: ["white", "black"],
  types: "ts",
} as const satisfies SelectProperty
