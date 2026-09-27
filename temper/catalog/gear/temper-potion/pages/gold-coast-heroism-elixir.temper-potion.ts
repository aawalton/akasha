import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const goldCoastHeroismElixir = {
  id: "01a0e108-307d-742c-a759-2cf18bfdca7c",
  type: "page-type/temper-potion",
  slug: "gold-coast-heroism-elixir",
  title: "Gold Coast Heroism Elixir",
  key: "gold-coast-heroism-elixir",
  itemId: 224832,
  restores: ["temper-metric/magicka-restore", "temper-metric/stamina-restore"],
} as const satisfies TemperPotion
