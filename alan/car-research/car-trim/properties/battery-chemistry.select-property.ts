import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const batteryChemistry = {
  id: "01a0c542-6ed1-7b8e-bc97-0d509b32ff25",
  type: "page-type/select-property",
  slug: "battery-chemistry",
  propertySlug: "battery-chemistry",
  definition: "the makeup of the traction battery's cells",
  values: ["NMC", "LFP", "NiMH", "LiPo", "other"],
  types: "ts",
  createdAt: "2026-09-21T18:37:40.433Z",
  updatedAt: "2026-09-22T13:47:07.000Z",
} as const satisfies SelectProperty
