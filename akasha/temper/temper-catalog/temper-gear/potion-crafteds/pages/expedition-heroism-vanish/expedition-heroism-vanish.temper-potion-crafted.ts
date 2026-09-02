import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionHeroismVanish = {
  id: "01a05fd8-a444-7c2f-b189-654fde6fa44b",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-heroism-vanish",
  title: "Essence of Speed",
  key: "expedition-heroism-vanish",
  description: "Grants Heroism, Invisible, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon's Bile", "Dragon Rheum", "Namira's Rot"],
    },
  ],
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
