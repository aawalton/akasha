import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceFortitudeSavageryHealthRestoreStaminaRestore = {
  id: "019e21f6-4064-7f1a-b15d-8c7656e32d5d",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-fortitude-savagery-health-restore-stamina-restore",
  title: "Essence of Weapon Crit",
  key: "endurance-fortitude-savagery-health-restore-stamina-restore",
  description: "Grants Restore Stamina, Restore Health, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/columbine",
        "temper-reagent/dragonthorn",
        "temper-reagent/water-hyacinth",
      ],
    },
    {
      reagents: [
        "temper-reagent/dragonthorn",
        "temper-reagent/mountain-flower",
        "temper-reagent/water-hyacinth",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 35,
  encodedTraits: 8455441,
  createdAt: "2026-05-13T15:30:47.012Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
