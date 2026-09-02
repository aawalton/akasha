import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const chaurusEgg = {
  id: "01a05fd8-a450-73ae-9482-fbe6264c0469",
  pageTypeSlug: "temper-reagent",
  slug: "chaurus-egg",
  title: "Chaurus Egg",
  key: "chaurus-egg",
  icon: "resources/crafting_chaurus_eggs.png",
  itemId: 150669,
  alchemyEffects: ["timidity", "ravage-magicka", "restore-stamina", "detection"],
} as const satisfies TemperReagent
