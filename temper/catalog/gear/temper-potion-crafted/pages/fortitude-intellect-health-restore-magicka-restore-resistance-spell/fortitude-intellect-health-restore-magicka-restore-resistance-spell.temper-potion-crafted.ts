import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const fortitudeIntellectHealthRestoreMagickaRestoreResistanceSpell = {
  id: "019e21f6-405a-7332-9b71-6af20ac7bfbf",
  type: "page-type/temper-potion-crafted",
  slug: "fortitude-intellect-health-restore-magicka-restore-resistance-spell",
  title: "Essence of Health",
  key: "fortitude-intellect-health-restore-magicka-restore-resistance-spell",
  description: "Grants Increase Spell Resistance, Restore Health, Restore Magicka.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: ["temper-reagent/bugloss", "temper-reagent/clam-gall", "temper-reagent/columbine"],
    },
    {
      reagents: [
        "temper-reagent/bugloss",
        "temper-reagent/columbine",
        "temper-reagent/mudcrab-chitin",
      ],
    },
    {
      reagents: ["temper-reagent/bugloss", "temper-reagent/columbine", "temper-reagent/white-cap"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
