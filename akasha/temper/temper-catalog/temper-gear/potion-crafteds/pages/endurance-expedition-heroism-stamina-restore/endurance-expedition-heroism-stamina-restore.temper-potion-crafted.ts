import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceExpeditionHeroismStaminaRestore = {
  id: "01a05fd8-a442-7c22-850f-729caef91d0a",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-expedition-heroism-stamina-restore",
  title: "Essence of Stamina",
  key: "endurance-expedition-heroism-stamina-restore",
  description: "Grants Restore Stamina, Speed, Heroism.",
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Dragon's Blood", "Dragon Rheum"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
