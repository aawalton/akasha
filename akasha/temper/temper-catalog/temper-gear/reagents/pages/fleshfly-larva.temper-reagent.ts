import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const fleshflyLarva = {
  id: "01a05fd8-a453-75dd-8a7f-07f5ffd45acb",
  pageTypeSlug: "temper-reagent",
  slug: "fleshfly-larva",
  title: "Fleshfly Larva",
  key: "fleshfly-larva",
  icon: "resources/reagent_fleshfly_larva.png",
  itemId: 77587,
  alchemyEffects: ["ravage-stamina", "vulnerability", "gradual-ravage-health", "vitality"],
} as const satisfies TemperReagent
