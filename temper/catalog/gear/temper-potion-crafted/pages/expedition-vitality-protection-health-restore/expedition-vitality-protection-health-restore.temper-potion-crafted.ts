import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionVitalityProtectionHealthRestore = {
  id: "019e21f6-404c-7bc2-a0ab-6f4f69d46830",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-vitality-protection-health-restore",
  title: "Essence of Speed",
  key: "expedition-vitality-protection-health-restore",
  description: "Grants Protection, Vitality, Lingering Health, Speed.",
  icon: "/esoui/art/icons/consumable_potion_010_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/scrib-jelly",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
