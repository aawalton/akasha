import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeVitalityHealthRestoreResistancePhysical = {
  id: "01a05fd8-a448-7414-9cf4-7c8478119968",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-vitality-health-restore-resistance-physical",
  title: "Essence of Health",
  key: "fortitude-vitality-health-restore-resistance-physical",
  description: "Grants Vitality, Increase Physical Resistance, Restore Health.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Butterfly Wing", "Mountain Flower"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
