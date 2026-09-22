import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceFortitudeHealthRestoreResistancePhysicalStaminaRestore = {
  id: "019e21f6-404a-7b8b-b6fb-10d869416a6f",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-fortitude-health-restore-resistance-physical-stamina-restore",
  title: "Essence of Health",
  key: "endurance-fortitude-health-restore-resistance-physical-stamina-restore",
  description: "Grants Increase Physical Resistance, Restore Health, Restore Stamina.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Beetle Scuttle", "Columbine", "Mountain Flower"],
    },
    {
      reagents: ["Columbine", "Imp Stool", "Mountain Flower"],
    },
    {
      reagents: ["Columbine", "Mountain Flower", "Mudcrab Chitin"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
