import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const vitalityStealthDetection = {
  id: "019e21f6-4048-78df-a946-724662503ccb",
  pageTypeSlug: "temper-potion-crafted",
  slug: "vitality-stealth-detection",
  title: "Essence of Detection",
  key: "vitality-stealth-detection",
  description: "Grants Vitality, Detection.",
  icon: "/esoui/art/icons/consumable_potion_009_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Beetle Scuttle", "Chaurus Egg", "Torchbug Thorax"],
    },
    {
      names: ["Beetle Scuttle", "Corn Flower", "Torchbug Thorax"],
    },
    {
      names: ["Beetle Scuttle", "Torchbug Thorax", "White Cap"],
    },
    {
      names: ["Beetle Scuttle", "Torchbug Thorax", "Wormwood"],
    },
    {
      names: ["Butterfly Wing", "Chaurus Egg", "Torchbug Thorax"],
    },
    {
      names: ["Butterfly Wing", "Corn Flower", "Torchbug Thorax"],
    },
    {
      names: ["Butterfly Wing", "Torchbug Thorax", "White Cap"],
    },
    {
      names: ["Butterfly Wing", "Torchbug Thorax", "Wormwood"],
    },
    {
      names: ["Chaurus Egg", "Dragon's Bile", "Torchbug Thorax"],
    },
    {
      names: ["Chaurus Egg", "Fleshfly Larva", "Torchbug Thorax"],
    },
    {
      names: ["Chaurus Egg", "Powdered Mother of Pearl", "Torchbug Thorax"],
    },
    {
      names: ["Corn Flower", "Dragon's Bile", "Torchbug Thorax"],
    },
    {
      names: ["Corn Flower", "Fleshfly Larva", "Torchbug Thorax"],
    },
    {
      names: ["Corn Flower", "Powdered Mother of Pearl", "Torchbug Thorax"],
    },
    {
      names: ["Dragon's Bile", "Torchbug Thorax", "White Cap"],
    },
    {
      names: ["Dragon's Bile", "Torchbug Thorax", "Wormwood"],
    },
    {
      names: ["Fleshfly Larva", "Torchbug Thorax", "White Cap"],
    },
    {
      names: ["Fleshfly Larva", "Torchbug Thorax", "Wormwood"],
    },
    {
      names: ["Powdered Mother of Pearl", "Torchbug Thorax", "White Cap"],
    },
    {
      names: ["Powdered Mother of Pearl", "Torchbug Thorax", "Wormwood"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
