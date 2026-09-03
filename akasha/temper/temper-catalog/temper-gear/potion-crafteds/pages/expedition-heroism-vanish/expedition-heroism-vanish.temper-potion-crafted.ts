import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionHeroismVanish = {
  id: "019e21f6-4068-7967-9cc5-1c6a9715eef8",
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
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
