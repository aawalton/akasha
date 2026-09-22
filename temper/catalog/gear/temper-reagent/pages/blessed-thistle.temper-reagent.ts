import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const blessedThistle = {
  id: "019e21f7-3b03-7823-9739-32504de7ebed",
  type: "page-type/temper-reagent",
  slug: "blessed-thistle",
  title: "Blessed Thistle",
  key: "blessed-thistle",
  icon: "resources/blessed_thistle.png",
  itemId: 30157,
  alchemyEffects: [
    "temper-poison-effect/restore-stamina",
    "temper-poison-effect/increase-weapon-power",
    "temper-poison-effect/ravage-health",
    "temper-poison-effect/speed",
  ],
} as const satisfies TemperReagent
