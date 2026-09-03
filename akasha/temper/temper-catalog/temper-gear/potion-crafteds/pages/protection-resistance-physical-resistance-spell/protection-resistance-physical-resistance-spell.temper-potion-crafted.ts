import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const protectionResistancePhysicalResistanceSpell = {
  id: "019e21f6-4040-729a-8efc-1b36559d376f",
  pageTypeSlug: "temper-potion-crafted",
  slug: "protection-resistance-physical-resistance-spell",
  title: "Essence of Physical Resistance",
  key: "protection-resistance-physical-resistance-spell",
  description: "Grants Increase Physical Resistance, Protection, Increase Spell Resistance.",
  icon: "/esoui/art/icons/consumable_potion_007_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Bugloss", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Clam Gall", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Mudcrab Chitin", "White Cap"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
