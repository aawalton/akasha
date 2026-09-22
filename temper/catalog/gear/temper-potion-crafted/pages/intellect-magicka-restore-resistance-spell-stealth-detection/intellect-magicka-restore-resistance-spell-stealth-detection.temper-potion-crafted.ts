import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const intellectMagickaRestoreResistanceSpellStealthDetection = {
  id: "019e21f6-405b-79ad-920f-c1268f20e594",
  type: "page-type/temper-potion-crafted",
  slug: "intellect-magicka-restore-resistance-spell-stealth-detection",
  title: "Essence of Magicka",
  key: "intellect-magicka-restore-resistance-spell-stealth-detection",
  description: "Grants Restore Magicka, Increase Spell Resistance, Detection.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["Bugloss", "Corn Flower", "White Cap"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
