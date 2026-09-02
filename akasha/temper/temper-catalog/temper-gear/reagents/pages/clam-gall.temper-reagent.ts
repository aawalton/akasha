import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const clamGall = {
  id: "01a05fd8-a451-7e0e-a1a0-7b151c73cb6a",
  pageTypeSlug: "temper-reagent",
  slug: "clam-gall",
  title: "Clam Gall",
  key: "clam-gall",
  icon: "resources/reagent_clam_gall.png",
  itemId: 139020,
  alchemyEffects: ["increase-spell-resist", "hindrance", "vulnerability", "defile"],
} as const satisfies TemperReagent
