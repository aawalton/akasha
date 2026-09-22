import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const fortitudeProphecySavageryHealthRestore = {
  id: "019e21f6-4066-7bd8-81d1-7b50e175d27f",
  type: "page-type/temper-potion-crafted",
  slug: "fortitude-prophecy-savagery-health-restore",
  title: "Essence of Weapon Crit",
  key: "fortitude-prophecy-savagery-health-restore",
  description: "Grants Spell Critical, Restore Health, Increase Weapon Crit.",
  icon: "/esoui/art/icons/consumable_potion_012_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Crimson Nirnroot", "Dragonthorn", "Water Hyacinth"],
    },
    {
      reagents: ["Crimson Nirnroot", "Water Hyacinth", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
