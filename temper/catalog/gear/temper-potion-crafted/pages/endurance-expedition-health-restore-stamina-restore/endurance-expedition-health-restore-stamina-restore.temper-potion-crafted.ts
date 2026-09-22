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
} as const satisfies TemperPotionCrafted
