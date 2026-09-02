import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const vileCoagulant = {
  id: "01a05fd8-a457-74e2-a237-f1c90878a378",
  pageTypeSlug: "temper-reagent",
  slug: "vile-coagulant",
  title: "Vile Coagulant",
  key: "vile-coagulant",
  icon: "resources/crafting_vile_coagula.png",
  itemId: 150670,
  alchemyEffects: ["timidity", "ravage-health", "restore-magicka", "protection"],
} as const satisfies TemperReagent
