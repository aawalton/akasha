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
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/butterfly-wing",
        "temper-reagent/mudcrab-chitin",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/dragons-bile",
        "temper-reagent/mudcrab-chitin",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/fleshfly-larva",
        "temper-reagent/mudcrab-chitin",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/imp-stool",
        "temper-reagent/powdered-mother-of-pearl",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/mountain-flower",
        "temper-reagent/powdered-mother-of-pearl",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/mudcrab-chitin",
        "temper-reagent/powdered-mother-of-pearl",
      ],
    },
    {
      reagents: [
        "temper-reagent/beetle-scuttle",
        "temper-reagent/mudcrab-chitin",
        "temper-reagent/torchbug-thorax",
      ],
    },
  ],
  effects: "jsonl",
  hashPlace: 13,
  encodedTraits: 8984861,
  createdAt: "2026-05-13T15:30:46.981Z",
  updatedAt: "2026-09-27T03:40:08.000Z",
} as const satisfies TemperPotionCrafted
