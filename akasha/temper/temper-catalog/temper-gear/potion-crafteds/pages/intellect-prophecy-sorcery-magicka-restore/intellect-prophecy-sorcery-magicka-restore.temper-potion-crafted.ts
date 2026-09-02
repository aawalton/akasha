import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const intellectProphecySorceryMagickaRestore = {
  id: "01a05fd8-a449-7608-9de7-5f58cf6a1554",
  pageTypeSlug: "temper-potion-crafted",
  slug: "intellect-prophecy-sorcery-magicka-restore",
  title: "Essence of Spell Power",
  key: "intellect-prophecy-sorcery-magicka-restore",
  description: "Grants Restore Magicka, Increase Spell Power, Spell Critical.",
  icon: "/esoui/art/icons/consumable_potion_006_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Corn Flower", "Crimson Nirnroot", "Lady's Smock"],
    },
    {
      names: ["Corn Flower", "Lady's Smock", "Namira's Rot"],
    },
    {
      names: ["Corn Flower", "Lady's Smock", "Water Hyacinth"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
