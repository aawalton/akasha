import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeProphecySavageryHealthRestore = {
  id: "01a05fd8-a447-7c8c-a927-d437a4a05e3e",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-prophecy-savagery-health-restore",
  title: "Essence of Weapon Crit",
  key: "fortitude-prophecy-savagery-health-restore",
  description: "Grants Spell Critical, Restore Health, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Crimson Nirnroot", "Dragonthorn", "Water Hyacinth"],
    },
    {
      names: ["Crimson Nirnroot", "Water Hyacinth", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
