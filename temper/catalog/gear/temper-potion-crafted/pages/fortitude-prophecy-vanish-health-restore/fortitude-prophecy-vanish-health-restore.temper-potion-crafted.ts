import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const fortitudeProphecyVanishHealthRestore = {
  id: "019e21f6-4058-7b75-838d-c25d8c959044",
  type: "page-type/temper-potion-crafted",
  slug: "fortitude-prophecy-vanish-health-restore",
  title: "Essence of Spell Critical",
  key: "fortitude-prophecy-vanish-health-restore",
  description: "Grants Restore Health, Invisible, Spell Critical.",
  icon: "/esoui/art/icons/consumable_potion_013_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Blue Entoloma", "Crimson Nirnroot", "Namira's Rot"],
    },
    {
      reagents: ["Blue Entoloma", "Namira's Rot", "Water Hyacinth"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
