import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const intellectSorceryMagickaRestoreStealthDetection = {
  id: "019e21f6-4061-7f2f-80f6-a8d7e436aefd",
  type: "page-type/temper-potion-crafted",
  slug: "intellect-sorcery-magicka-restore-stealth-detection",
  title: "Essence of Spell Power",
  key: "intellect-sorcery-magicka-restore-stealth-detection",
  description: "Grants Detection, Restore Magicka, Increase Spell Power.",
  icon: "/esoui/art/icons/consumable_potion_006_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/chaurus-egg",
        "temper-reagent/corn-flower",
        "temper-reagent/ladys-smock",
      ],
    },
    {
      reagents: [
        "temper-reagent/corn-flower",
        "temper-reagent/ladys-smock",
        "temper-reagent/torchbug-thorax",
      ],
    },
    {
      reagents: [
        "temper-reagent/corn-flower",
        "temper-reagent/ladys-smock",
        "temper-reagent/white-cap",
      ],
    },
    {
      reagents: [
        "temper-reagent/corn-flower",
        "temper-reagent/ladys-smock",
        "temper-reagent/wormwood",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
