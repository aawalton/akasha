import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceSavageryStaminaRestoreStealthDetection = {
  id: "019e21f6-4063-70f0-b02c-06f7d744ad2c",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-savagery-stamina-restore-stealth-detection",
  title: "Essence of Weapon Crit",
  key: "endurance-savagery-stamina-restore-stealth-detection",
  description: "Grants Restore Stamina, Detection, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/chaurus-egg",
        "temper-reagent/dragonthorn",
        "temper-reagent/wormwood",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 33,
  encodedTraits: 8720661,
  createdAt: "2026-05-13T15:30:47.011Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
