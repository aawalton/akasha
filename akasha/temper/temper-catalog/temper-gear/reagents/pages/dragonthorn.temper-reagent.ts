import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonthorn = {
  id: "01a05fd8-a453-724a-ac8f-53bee699f83d",
  pageTypeSlug: "temper-reagent",
  slug: "dragonthorn",
  title: "Dragonthorn",
  key: "dragonthorn",
  icon: "resources/dragonthorn.png",
  itemId: 30162,
  alchemyEffects: ["increase-weapon-power", "restore-stamina", "fracture", "increase-weapon-crit"],
} as const satisfies TemperReagent
