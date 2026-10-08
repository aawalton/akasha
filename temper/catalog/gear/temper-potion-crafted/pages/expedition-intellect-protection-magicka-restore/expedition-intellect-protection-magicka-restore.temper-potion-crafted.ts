import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const expeditionIntellectProtectionMagickaRestore = {
  id: "019e21f6-406d-7fb4-aaca-8547f12a16b8",
  type: "page-type/temper-potion-crafted",
  slug: "expedition-intellect-protection-magicka-restore",
  title: "Essence of Magicka",
  key: "expedition-intellect-protection-magicka-restore",
  description: "Grants Speed, Restore Magicka, Protection.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/dragon-rheum",
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/vile-coagulant",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 44,
  encodedTraits: 8591129,
  createdAt: "2026-05-13T15:30:47.021Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
