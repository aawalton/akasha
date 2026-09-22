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
} as const satisfies TemperPotionCrafted
