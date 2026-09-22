import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const vitalityProtectionResistancePhysical = {
  id: "019e21f6-4045-7f82-bf12-19cb6068b0b6",
  type: "page-type/temper-potion-crafted",
  slug: "vitality-protection-resistance-physical",
  title: "Essence of Vitality",
  key: "vitality-protection-resistance-physical",
  description: "Grants Vitality, Increase Physical Resistance, Protection.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Beetle Scuttle", "Butterfly Wing", "Mudcrab Chitin"],
    },
    {
      reagents: ["Beetle Scuttle", "Dragon's Bile", "Mudcrab Chitin"],
    },
    {
      reagents: ["Beetle Scuttle", "Fleshfly Larva", "Mudcrab Chitin"],
    },
    {
      reagents: ["Beetle Scuttle", "Imp Stool", "Powdered Mother of Pearl"],
    },
    {
      reagents: ["Beetle Scuttle", "Mountain Flower", "Powdered Mother of Pearl"],
    },
    {
      reagents: ["Beetle Scuttle", "Mudcrab Chitin", "Powdered Mother of Pearl"],
    },
    {
      reagents: ["Beetle Scuttle", "Mudcrab Chitin", "Torchbug Thorax"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
