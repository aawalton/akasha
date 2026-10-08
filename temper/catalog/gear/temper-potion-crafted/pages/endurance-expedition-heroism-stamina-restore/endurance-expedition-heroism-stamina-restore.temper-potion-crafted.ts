import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceExpeditionHeroismStaminaRestore = {
  id: "019e21f6-4051-7f75-83df-4e87729cb594",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-expedition-heroism-stamina-restore",
  title: "Essence of Stamina",
  key: "endurance-expedition-heroism-stamina-restore",
  description: "Grants Restore Stamina, Speed, Heroism.",
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/blessed-thistle",
        "temper-reagent/dragons-blood",
        "temper-reagent/dragon-rheum",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 19,
  encodedTraits: 8722207,
  createdAt: "2026-05-13T15:30:46.993Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
