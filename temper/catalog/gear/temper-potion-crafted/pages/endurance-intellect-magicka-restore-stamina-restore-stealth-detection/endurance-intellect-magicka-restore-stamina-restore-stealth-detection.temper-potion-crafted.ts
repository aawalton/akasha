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
  hashPlace: 31,
  encodedTraits: 8586517,
  createdAt: "2026-05-13T15:30:47.009Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
