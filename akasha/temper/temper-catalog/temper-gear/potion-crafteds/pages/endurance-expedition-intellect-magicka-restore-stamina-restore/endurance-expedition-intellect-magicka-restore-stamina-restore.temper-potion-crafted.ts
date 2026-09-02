import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceExpeditionIntellectMagickaRestoreStaminaRestore = {
  id: "01a05fd8-a442-7b50-9aed-193af6ff5c02",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-expedition-intellect-magicka-restore-stamina-restore",
  title: "Essence of Magicka",
  key: "endurance-expedition-intellect-magicka-restore-stamina-restore",
  description: "Grants Restore Stamina, Speed, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Blessed Thistle", "Columbine", "Dragon Rheum"],
    },
  ],
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
