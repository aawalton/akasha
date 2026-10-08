import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionVitalityVanish = {
  id: "019e21f6-406a-7fbe-ac10-35674cfbae81",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-vitality-vanish",
  title: "Essence of Speed",
  key: "expedition-vitality-vanish",
  description: "Grants Invisible, Vitality, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/dragons-bile",
        "temper-reagent/namiras-rot",
        "temper-reagent/powdered-mother-of-pearl",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 41,
  encodedTraits: 9836317,
  createdAt: "2026-05-13T15:30:47.018Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
