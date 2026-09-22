import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const fortitudeIntellectProphecyHealthRestoreMagickaRestore = {
  id: "019e21f6-405d-700c-8033-aab4d9498ed0",
  type: "page-type/temper-potion-crafted",
  slug: "fortitude-intellect-prophecy-health-restore-magicka-restore",
  title: "Essence of Spell Critical",
  key: "fortitude-intellect-prophecy-health-restore-magicka-restore",
  description: "Grants Restore Health, Restore Magicka, Spell Critical.",
  icon: "/esoui/art/icons/consumable_potion_013_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Bugloss", "Crimson Nirnroot", "Lady's Smock"],
    },
    {
      reagents: ["Bugloss", "Lady's Smock", "Water Hyacinth"],
    },
    {
      reagents: ["Columbine", "Crimson Nirnroot", "Lady's Smock"],
    },
    {
      reagents: ["Columbine", "Lady's Smock", "Water Hyacinth"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
