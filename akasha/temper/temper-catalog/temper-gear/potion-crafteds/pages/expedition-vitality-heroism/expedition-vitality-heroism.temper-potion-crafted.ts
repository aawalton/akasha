import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const expeditionVitalityHeroism = {
  id: "01a05fd8-a446-7ca3-b4a5-40b7641aa1eb",
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
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
