import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceExpeditionIntellectMagickaRestoreStaminaRestore = {
  id: "019e21f6-4050-738b-be1b-08034b8d4d7a",
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
} as const satisfies TemperPotionCrafted
