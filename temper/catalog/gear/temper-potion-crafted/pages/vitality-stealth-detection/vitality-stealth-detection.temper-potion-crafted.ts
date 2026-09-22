import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const vitalityStealthDetection = {
  id: "019e21f6-4048-78df-a946-724662503ccb",
  type: "page-type/temper-potion-crafted",
  slug: "vitality-stealth-detection",
  title: "Essence of Detection",
  key: "vitality-stealth-detection",
  description: "Grants Vitality, Detection.",
  icon: "/esoui/art/icons/consumable_potion_009_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Beetle Scuttle", "Chaurus Egg", "Torchbug Thorax"],
    },
    {
      reagents: ["Beetle Scuttle", "Corn Flower", "Torchbug Thorax"],
    },
    {
      reagents: ["Beetle Scuttle", "Torchbug Thorax", "White Cap"],
    },
    {
      reagents: ["Beetle Scuttle", "Torchbug Thorax", "Wormwood"],
    },
    {
      reagents: ["Butterfly Wing", "Chaurus Egg", "Torchbug Thorax"],
    },
    {
      reagents: ["Butterfly Wing", "Corn Flower", "Torchbug Thorax"],
    },
    {
      reagents: ["Butterfly Wing", "Torchbug Thorax", "White Cap"],
    },
    {
      reagents: ["Butterfly Wing", "Torchbug Thorax", "Wormwood"],
    },
    {
      reagents: ["Chaurus Egg", "Dragon's Bile", "Torchbug Thorax"],
    },
    {
      reagents: ["Chaurus Egg", "Fleshfly Larva", "Torchbug Thorax"],
    },
    {
      reagents: ["Chaurus Egg", "Powdered Mother of Pearl", "Torchbug Thorax"],
    },
    {
      reagents: ["Corn Flower", "Dragon's Bile", "Torchbug Thorax"],
    },
    {
      reagents: ["Corn Flower", "Fleshfly Larva", "Torchbug Thorax"],
    },
    {
      reagents: ["Corn Flower", "Powdered Mother of Pearl", "Torchbug Thorax"],
    },
    {
      reagents: ["Dragon's Bile", "Torchbug Thorax", "White Cap"],
    },
    {
      reagents: ["Dragon's Bile", "Torchbug Thorax", "Wormwood"],
    },
    {
      reagents: ["Fleshfly Larva", "Torchbug Thorax", "White Cap"],
    },
    {
      reagents: ["Fleshfly Larva", "Torchbug Thorax", "Wormwood"],
    },
    {
      reagents: ["Powdered Mother of Pearl", "Torchbug Thorax", "White Cap"],
    },
    {
      reagents: ["Powdered Mother of Pearl", "Torchbug Thorax", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
