import type { SelectProperty } from "@akasha/pages-system/select-property"

export const solverColor = {
  id: "01a06582-bd62-77f7-a5a9-76e438a7c6ff",
  pageTypeSlug: "select-property",
  slug: "solver-color",
  propertySlug: "solver-color",
  definition: "which side the solver moves",
  values: ["white", "black"],
} as const satisfies SelectProperty

export type SolverColor = (typeof solverColor.values)[number]
