import type { TemperPotionCrown } from "../../temper-potion-crown.page-type.ts"

export const goldCoastSpellcasterElixir = {
  id: "019e21f5-7537-7b7b-afa1-7e09c321abb0",
  pageTypeSlug: "temper-potion-crown",
  slug: "gold-coast-spellcaster-elixir",
  title: "Gold Coast Spellcaster Elixir",
  key: "gold-coast-spellcaster-elixir",
  description:
    "Restore 7582 Magicka immediately. Grants Major Intellect which increases your Magicka Recovery by 30% for 36.3 seconds. Also grants Major Sorcery and Major Prophecy, increasing your Spell Damage by 20% and Spell Critical by 2629 for 36.3 seconds.",
  displayOrder: 1,
  icon: "/esoui/art/icons/crownpotion_spellcaster.dds",
  itemId: 112427,
  categoryId: "potions",
  subcategoryId: "crown",
  level: "Scaled",
  seconds: 36.3,
  effects: "jsonl",
} as const satisfies TemperPotionCrown
