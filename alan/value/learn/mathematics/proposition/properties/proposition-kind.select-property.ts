import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const propositionKind = {
  id: "01a06575-c2ac-79a2-8fb6-6813b90c6e3e",
  type: "page-type/select-property",
  slug: "proposition-kind",
  propertySlug: "proposition-kind",
  definition: "how Alan settles a proposition",
  values: ["definition", "axiom", "theorem"],
  types: "ts",
  createdAt: "2026-09-03T04:10:11.500Z",
  updatedAt: "2026-10-30T16:44:59.114Z",
} as const satisfies SelectProperty
