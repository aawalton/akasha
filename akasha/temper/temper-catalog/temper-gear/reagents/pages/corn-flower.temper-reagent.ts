import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const cornFlower = {
  id: "01a05fd8-a451-7e2d-963c-67e9e087c64b",
  pageTypeSlug: "temper-reagent",
  slug: "corn-flower",
  title: "Corn Flower",
  key: "corn-flower",
  icon: "resources/corn_flower_r1.png",
  itemId: 30161,
  alchemyEffects: ["restore-magicka", "increase-spell-power", "ravage-health", "detection"],
} as const satisfies TemperReagent
