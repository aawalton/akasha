import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const propositionStatus = {
  id: "01a06575-c2ac-797b-b1d3-d6847cb7c62a",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "proposition-status",
  propertySlug: "proposition-status",
  definition: "where the statement is in being settled",
  values: ["open", "adopted", "proved", "parked"],
} as const satisfies SelectProperty

export type PropositionStatus = (typeof propositionStatus.values)[number]
