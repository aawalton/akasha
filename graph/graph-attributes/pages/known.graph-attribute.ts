import type { GraphAttribute } from "../graph-attribute.page-type.ts"

export type Known = "index" | "declaration"

export const known = {
  id: "01a0523c-ca75-7c18-9a3e-32fdd5ed98ad",
  pageTypeSlug: "graph-attribute",
  slug: "known",
  definition: "how an edge was known",
} as const satisfies GraphAttribute
