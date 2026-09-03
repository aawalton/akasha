import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const clamGall = {
  id: "019e21f7-3b0e-71af-9af1-3f3e0b61a2f2",
  pageTypeSlug: "temper-reagent",
  slug: "clam-gall",
  title: "Clam Gall",
  key: "clam-gall",
  icon: "resources/reagent_clam_gall.png",
  itemId: 139020,
  alchemyEffects: ["increase-spell-resist", "hindrance", "vulnerability", "defile"],
} as const satisfies TemperReagent
