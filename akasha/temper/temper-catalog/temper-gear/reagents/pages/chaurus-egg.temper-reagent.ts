import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const chaurusEgg = {
  id: "019e21f7-3b0c-7757-bdb2-01abe41fb21a",
  pageTypeSlug: "temper-reagent",
  slug: "chaurus-egg",
  title: "Chaurus Egg",
  key: "chaurus-egg",
  icon: "resources/crafting_chaurus_eggs.png",
  itemId: 150669,
  alchemyEffects: ["timidity", "ravage-magicka", "restore-stamina", "detection"],
} as const satisfies TemperReagent
