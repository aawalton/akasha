import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionVitalityHeroism = {
  id: "019e21f6-4069-7b1f-8df3-4713c318e8f2",
  pageTypeSlug: "temper-potion-crafted",
  slug: "expedition-vitality-heroism",
  title: "Essence of Speed",
  key: "expedition-vitality-heroism",
  description: "Grants Heroism, Vitality, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Dragon's Bile", "Dragon Rheum", "Powdered Mother of Pearl"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
