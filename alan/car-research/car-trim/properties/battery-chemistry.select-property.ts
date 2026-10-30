import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const batteryChemistry = {
  id: "01a0c542-6ed1-7b8e-bc97-0d509b32ff25",
  type: "page-type/select-property",
  slug: "battery-chemistry",
  propertySlug: "battery-chemistry",
  definition: "the chemistry of the main battery of a car trim",
  values: ["NMC", "LFP", "NiMH", "LiPo", "other"],
  types: "ts",
  createdAt: "2026-09-21T18:37:40.433Z",
  updatedAt: "2026-10-30T14:51:59.104Z",
} as const satisfies SelectProperty
