import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceIntellectMagickaRestoreStaminaRestoreStealthDetection = {
  id: "019e21f6-4061-7081-85cb-4af7a4129705",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-intellect-magicka-restore-stamina-restore-stealth-detection",
  title: "Essence of Magicka",
  key: "endurance-intellect-magicka-restore-stamina-restore-stealth-detection",
  description: "Grants Restore Stamina, Detection, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/chaurus-egg",
        "temper-reagent/columbine",
        "temper-reagent/corn-flower",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
