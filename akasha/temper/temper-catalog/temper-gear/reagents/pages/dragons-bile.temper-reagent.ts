import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const dragonsBile = {
  id: "01a05fd8-a452-7ebf-8b5d-5746e9ebd169",
  pageTypeSlug: "temper-reagent",
  slug: "dragons-bile",
  title: "Dragon's Bile",
  key: "dragons-bile",
  icon: "resources/dragonsbile.png",
  itemId: 150789,
  alchemyEffects: ["heroism", "vulnerability", "invisible", "vitality"],
} as const satisfies TemperReagent
