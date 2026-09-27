import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const boundGoldCoastWarriorElixir = {
  id: "01a0e108-307d-70ec-8004-3e7f4ffbd7cf",
  type: "page-type/temper-potion",
  slug: "bound-gold-coast-warrior-elixir",
  title: "Bound Gold Coast Warrior Elixir",
  key: "bound-gold-coast-warrior-elixir",
  itemId: 135127,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
