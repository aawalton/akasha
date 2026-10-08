import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const powertrainType = {
  id: "01a0c542-b787-76b5-a6b3-b868475dfdca",
  type: "page-type/select-property",
  slug: "powertrain-type",
  propertySlug: "powertrain-type",
  definition: "what moves a trim and the source of that trim's energy",
  values: ["BEV", "PHEV", "HEV", "MHEV"],
  types: "ts",
  createdAt: "2026-09-21T18:37:59.047Z",
  updatedAt: "2026-09-22T13:50:37.000Z",
} as const satisfies SelectProperty
