import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const enduranceFortitudeHealthRestoreResistancePhysicalStaminaRestore = {
  id: "01a05fd8-a442-7acd-8134-1ebeb3a66a97",
  pageTypeSlug: "temper-potion-crafted",
  slug: "endurance-fortitude-health-restore-resistance-physical-stamina-restore",
  title: "Essence of Health",
  key: "endurance-fortitude-health-restore-resistance-physical-stamina-restore",
  description: "Grants Increase Physical Resistance, Restore Health, Restore Stamina.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Columbine", "Mountain Flower"],
    },
    {
      names: ["Columbine", "Imp Stool", "Mountain Flower"],
    },
    {
      names: ["Columbine", "Mountain Flower", "Mudcrab Chitin"],
    },
  ],
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
