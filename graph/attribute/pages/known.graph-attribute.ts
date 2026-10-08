import type { GraphAttribute } from "akasha/graph/attribute/graph-attribute.page-type.types.ts"

export type Known = "reference" | "declaration"

export const known = {
  id: "01a0523c-ca75-7c18-9a3e-32fdd5ed98ad",
  type: "page-type/graph-attribute",
  slug: "known",
  definition: "how an edge was known",
  createdAt: "2026-08-30T10:35:10.837Z",
  updatedAt: "2026-09-15T17:04:40.000Z",
} as const satisfies GraphAttribute
