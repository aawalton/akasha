import type { SelectProperty } from "@akasha/pages-system/select-property"

export const propositionKind = {
  id: "01a06575-c2ac-79a2-8fb6-6813b90c6e3e",
  pageTypeSlug: "select-property",
  slug: "proposition-kind",
  propertySlug: "proposition-kind",
  definition: "whether the statement is given, assumed, or to be derived",
  values: ["definition", "axiom", "theorem"],
} as const satisfies SelectProperty

export type PropositionKind = (typeof propositionKind.values)[number]
