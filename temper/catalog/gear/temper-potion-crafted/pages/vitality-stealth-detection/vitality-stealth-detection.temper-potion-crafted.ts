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
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/chaurus-egg",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/corn-flower",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/white-cap",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/wormwood",
      ],
    },
    {
      reagents: [
        "temper-reagent/butterfly-wing",
        "temper-reagent/chaurus-egg",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/butterfly-wing",
        "temper-reagent/corn-flower",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/butterfly-wing",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/white-cap",
      ],
    },
    {
      reagents: [
        "temper-reagent/butterfly-wing",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/wormwood",
      ],
    },
    {
      reagents: [
        "temper-reagent/chaurus-egg",
        "temper-reagent/dragons-bile",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/chaurus-egg",
        "temper-reagent/fleshfly-larva",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/chaurus-egg",
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/corn-flower",
        "temper-reagent/dragons-bile",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/corn-flower",
        "temper-reagent/fleshfly-larva",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/corn-flower",
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/dragons-bile",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/white-cap",
      ],
    },
    {
      reagents: [
        "temper-reagent/dragons-bile",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/wormwood",
      ],
    },
    {
      reagents: [
        "temper-reagent/fleshfly-larva",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/white-cap",
      ],
    },
    {
      reagents: [
        "temper-reagent/fleshfly-larva",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/wormwood",
      ],
    },
    {
      reagents: [
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/white-cap",
      ],
    },
    {
      reagents: [
        "temper-reagent/powdered-mother-of-pearl",
        "temper-reagent/torchbug-thorax",
        "temper-reagent/wormwood",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
