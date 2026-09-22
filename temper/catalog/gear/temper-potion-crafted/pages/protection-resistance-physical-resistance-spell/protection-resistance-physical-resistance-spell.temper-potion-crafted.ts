import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const protectionResistancePhysicalResistanceSpell = {
  id: "019e21f6-4040-729a-8efc-1b36559d376f",
  type: "page-type/temper-potion-crafted",
  slug: "protection-resistance-physical-resistance-spell",
  title: "Essence of Physical Resistance",
  key: "protection-resistance-physical-resistance-spell",
  description: "Grants Increase Physical Resistance, Protection, Increase Spell Resistance.",
  icon: "/esoui/art/icons/consumable_potion_007_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Beetle Scuttle", "Bugloss", "Mudcrab Chitin"],
    },
    {
      reagents: ["Beetle Scuttle", "Clam Gall", "Mudcrab Chitin"],
    },
    {
      reagents: ["Beetle Scuttle", "Mudcrab Chitin", "White Cap"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
