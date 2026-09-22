import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionHeroismVanish = {
  id: "019e21f6-4068-7967-9cc5-1c6a9715eef8",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-heroism-vanish",
  title: "Essence of Speed",
  key: "expedition-heroism-vanish",
  description: "Grants Heroism, Invisible, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      names: ["Dragon's Bile", "Dragon Rheum", "Namira's Rot"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
