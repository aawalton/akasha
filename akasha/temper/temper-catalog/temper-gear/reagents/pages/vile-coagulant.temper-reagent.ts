import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const vileCoagulant = {
  id: "019e21f7-3b26-7c69-ace9-bedf3b87e28d",
  pageTypeSlug: "temper-reagent",
  slug: "vile-coagulant",
  title: "Vile Coagulant",
  key: "vile-coagulant",
  icon: "resources/crafting_vile_coagula.png",
  itemId: 150670,
  alchemyEffects: ["timidity", "ravage-health", "restore-magicka", "protection"],
} as const satisfies TemperReagent
