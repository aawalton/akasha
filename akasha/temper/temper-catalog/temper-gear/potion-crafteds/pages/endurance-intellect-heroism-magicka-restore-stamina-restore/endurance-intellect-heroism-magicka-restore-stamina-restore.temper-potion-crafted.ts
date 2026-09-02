import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceIntellectHeroismMagickaRestoreStaminaRestore = {
  id: "01a05fd8-a443-7eed-abff-765ecb397884",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-intellect-heroism-magicka-restore-stamina-restore",
  title: "Essence of Magicka",
  key: "endurance-intellect-heroism-magicka-restore-stamina-restore",
  description: "Grants Restore Stamina, Restore Magicka, Heroism.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Columbine", "Dragon's Blood", "Dragon Rheum"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
