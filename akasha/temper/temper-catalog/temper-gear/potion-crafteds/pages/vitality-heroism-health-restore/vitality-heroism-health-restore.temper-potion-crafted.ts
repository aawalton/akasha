import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const vitalityHeroismHealthRestore = {
  id: "01a05fd8-a44b-785c-93f8-a913928886b2",
  pageTypeSlug: "temper-potion-crafted",
  slug: "vitality-heroism-health-restore",
  title: "Essence of Vitality",
  key: "vitality-heroism-health-restore",
  description: "Grants Vitality, Lingering Health, Heroism.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Butterfly Wing", "Dragon's Bile", "Dragon's Blood"],
    },
    {
      names: ["Dragon's Bile", "Dragon's Blood", "Powdered Mother of Pearl"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
