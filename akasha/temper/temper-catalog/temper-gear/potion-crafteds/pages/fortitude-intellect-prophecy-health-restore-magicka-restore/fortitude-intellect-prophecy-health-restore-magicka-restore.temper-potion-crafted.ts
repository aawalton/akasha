import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeIntellectProphecyHealthRestoreMagickaRestore = {
  id: "01a05fd8-a447-7941-8c85-eae234c2c9be",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-intellect-prophecy-health-restore-magicka-restore",
  title: "Essence of Spell Critical",
  key: "fortitude-intellect-prophecy-health-restore-magicka-restore",
  description: "Grants Restore Health, Restore Magicka, Spell Critical.",
  icon: "/esoui/art/icons/consumable_potion_013_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Bugloss", "Crimson Nirnroot", "Lady's Smock"],
    },
    {
      names: ["Bugloss", "Lady's Smock", "Water Hyacinth"],
    },
    {
      names: ["Columbine", "Crimson Nirnroot", "Lady's Smock"],
    },
    {
      names: ["Columbine", "Lady's Smock", "Water Hyacinth"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
