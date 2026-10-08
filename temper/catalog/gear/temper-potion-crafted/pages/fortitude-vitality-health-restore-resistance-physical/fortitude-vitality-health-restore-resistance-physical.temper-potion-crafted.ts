import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const fortitudeVitalityHealthRestoreResistancePhysical = {
  id: "019e21f6-4043-758e-ae26-fbcaa8540cd5",
  type: "page-type/temper-potion-crafted",
  slug: "fortitude-vitality-health-restore-resistance-physical",
  title: "Essence of Health",
  key: "fortitude-vitality-health-restore-resistance-physical",
  description: "Grants Vitality, Increase Physical Resistance, Restore Health.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/butterfly-wing",
        "temper-reagent/mountain-flower",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 12,
  encodedTraits: 8456477,
  createdAt: "2026-05-13T15:30:46.979Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
