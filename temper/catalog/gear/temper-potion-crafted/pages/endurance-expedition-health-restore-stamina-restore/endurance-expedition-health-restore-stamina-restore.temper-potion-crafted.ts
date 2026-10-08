import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceExpeditionHealthRestoreStaminaRestore = {
  id: "019e21f6-4053-7b01-941e-60c44e62ed2c",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-expedition-health-restore-stamina-restore",
  title: "Essence of Stamina",
  key: "endurance-expedition-health-restore-stamina-restore",
  description: "Grants Restore Stamina, Speed, Lingering Health.",
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/blessed-thistle",
        "temper-reagent/dragons-blood",
        "temper-reagent/powdered-mother-of-pearl",
      ],
    },
    {
      reagents: [
        "temper-reagent/blessed-thistle",
        "temper-reagent/dragons-blood",
        "temper-reagent/scrib-jelly",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 20,
  encodedTraits: 8722203,
  createdAt: "2026-05-13T15:30:46.995Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
