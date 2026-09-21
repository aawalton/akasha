import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const powertrainType = {
  id: "01a0c542-b787-76b5-a6b3-b868475dfdca",
  type: "page-type/select-property",
  slug: "powertrain-type",
  propertySlug: "powertrain-type",
  definition: "what moves a trim and where that trim takes its energy from",
  values: ["BEV", "PHEV", "HEV", "MHEV"],
  types: "ts",
} as const satisfies SelectProperty
