import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionHeroismHealthRestore = {
  id: "019e21f6-406c-7257-849f-626045c248e8",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-heroism-health-restore",
  title: "Essence of Speed",
  key: "expedition-heroism-health-restore",
  description: "Grants Heroism, Lingering Health, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/dragons-blood",
        "temper-reagent/dragon-rheum",
        "temper-reagent/powdered-mother-of-pearl",
      ],
    },
    {
      reagents: [
        "temper-reagent/dragons-blood",
        "temper-reagent/dragon-rheum",
        "temper-reagent/scrib-jelly",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
