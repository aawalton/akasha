import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const fortitudeVitalityVanishHealthRestore = {
  id: "019e21f6-4057-77bd-b738-57be814e3db3",
  type: "page-type/temper-potion-crafted",
  slug: "fortitude-vitality-vanish-health-restore",
  title: "Essence of Health",
  key: "fortitude-vitality-vanish-health-restore",
  description: "Grants Restore Health, Invisible, Vitality.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/blue-entoloma",
        "temper-reagent/butterfly-wing",
        "temper-reagent/dragons-bile",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 23,
  encodedTraits: 8459805,
  createdAt: "2026-05-13T15:30:46.999Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
