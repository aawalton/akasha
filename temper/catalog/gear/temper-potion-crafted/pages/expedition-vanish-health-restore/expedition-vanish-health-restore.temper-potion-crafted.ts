import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionVanishHealthRestore = {
  id: "019e21f6-406e-7dd6-a6ca-a6252a9bbcfe",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-vanish-health-restore",
  title: "Essence of Speed",
  key: "expedition-vanish-health-restore",
  description: "Grants Speed, Invisible, Lingering Health.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/namiras-rot",
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/spider-egg",
      ],
    },
    {
      reagents: [
        "temper-reagent/namiras-rot",
        "temper-reagent/scrib-jelly",
        "temper-reagent/spider-egg",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 45,
  encodedTraits: 9836315,
  createdAt: "2026-05-13T15:30:47.022Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
