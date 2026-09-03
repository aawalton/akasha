import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonthorn = {
  id: "019e21f7-3b17-7bda-9f80-d46932033b33",
  pageTypeSlug: "temper-reagent",
  slug: "dragonthorn",
  title: "Dragonthorn",
  key: "dragonthorn",
  icon: "resources/dragonthorn.png",
  itemId: 30162,
  alchemyEffects: ["increase-weapon-power", "restore-stamina", "fracture", "increase-weapon-crit"],
} as const satisfies TemperReagent
