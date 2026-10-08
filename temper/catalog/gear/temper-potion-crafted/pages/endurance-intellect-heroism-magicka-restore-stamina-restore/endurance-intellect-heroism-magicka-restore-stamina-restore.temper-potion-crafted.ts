import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const enduranceIntellectHeroismMagickaRestoreStaminaRestore = {
  id: "019e21f6-4063-7fbc-a10b-e986b832e77f",
  type: "page-type/temper-potion-crafted",
  slug: "endurance-intellect-heroism-magicka-restore-stamina-restore",
  title: "Essence of Magicka",
  key: "endurance-intellect-heroism-magicka-restore-stamina-restore",
  description: "Grants Restore Stamina, Restore Magicka, Heroism.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/columbine",
        "temper-reagent/dragons-blood",
        "temper-reagent/dragon-rheum",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 34,
  encodedTraits: 8586527,
  createdAt: "2026-05-13T15:30:47.011Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
