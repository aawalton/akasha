import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const vitalityProtectionResistancePhysical = {
  id: "01a05fd8-a44b-7380-b840-eae3aa3acb7a",
  pageTypeSlug: "temper-potion-crafted",
  slug: "vitality-protection-resistance-physical",
  title: "Essence of Vitality",
  key: "vitality-protection-resistance-physical",
  description: "Grants Vitality, Increase Physical Resistance, Protection.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Butterfly Wing", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Dragon's Bile", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Fleshfly Larva", "Mudcrab Chitin"],
    },
    {
      names: ["Beetle Scuttle", "Imp Stool", "Powdered Mother of Pearl"],
    },
    {
      names: ["Beetle Scuttle", "Mountain Flower", "Powdered Mother of Pearl"],
    },
    {
      names: ["Beetle Scuttle", "Mudcrab Chitin", "Powdered Mother of Pearl"],
    },
    {
      names: ["Beetle Scuttle", "Mudcrab Chitin", "Torchbug Thorax"],
    },
  ],
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
