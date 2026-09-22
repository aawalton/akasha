import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const batteryChemistry = {
  id: "01a0c542-6ed1-7b8e-bc97-0d509b32ff25",
  type: "page-type/select-property",
  slug: "battery-chemistry",
  propertySlug: "battery-chemistry",
  definition: "the makeup of the traction battery's cells",
  values: ["NMC", "LFP", "NiMH", "LiPo", "other"],
  types: "ts",
} as const satisfies SelectProperty
