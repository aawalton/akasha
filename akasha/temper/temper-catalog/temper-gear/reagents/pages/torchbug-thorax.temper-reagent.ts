import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const torchbugThorax = {
  id: "01a05fd8-a457-7533-ac5b-b43fc8a58d31",
  pageTypeSlug: "temper-reagent",
  slug: "torchbug-thorax",
  title: "Torchbug Thorax",
  key: "torchbug-thorax",
  icon: "resources/reagent_torchbug_thorax.png",
  itemId: 77581,
  alchemyEffects: ["fracture", "enervation", "detection", "vitality"],
} as const satisfies TemperReagent
