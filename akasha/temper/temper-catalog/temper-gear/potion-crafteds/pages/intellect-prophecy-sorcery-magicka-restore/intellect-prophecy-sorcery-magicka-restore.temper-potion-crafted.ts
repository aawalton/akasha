import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const intellectProphecySorceryMagickaRestore = {
  id: "019e21f6-4065-7d5c-a414-89a62ad66e2d",
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
