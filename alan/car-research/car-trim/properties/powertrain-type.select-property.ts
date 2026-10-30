import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const powertrainType = {
  id: "01a0c542-b787-76b5-a6b3-b868475dfdca",
  type: "page-type/select-property",
  slug: "powertrain-type",
  propertySlug: "powertrain-type",
  definition: "the kind of power that moves a car trim",
  values: ["BEV", "PHEV", "HEV", "MHEV"],
  types: "ts",
  createdAt: "2026-09-21T18:37:59.047Z",
  updatedAt: "2026-10-30T14:58:01.615Z",
} as const satisfies SelectProperty
