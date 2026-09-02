import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const blessedThistle = {
  id: "01a05fd8-a44f-7534-84c1-ed521fd8d503",
  pageTypeSlug: "temper-reagent",
  slug: "blessed-thistle",
  title: "Blessed Thistle",
  key: "blessed-thistle",
  icon: "resources/blessed_thistle.png",
  itemId: 30157,
  alchemyEffects: ["restore-stamina", "increase-weapon-power", "ravage-health", "speed"],
} as const satisfies TemperReagent
