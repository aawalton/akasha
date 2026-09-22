import type { TemperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.types.ts"

export const intellectProtectionMagickaRestoreResistanceSpell = {
  id: "019e21f6-405f-723a-823f-388d7e848b7c",
  type: "page-type/temper-potion-crafted",
  slug: "intellect-protection-magicka-restore-resistance-spell",
  title: "Essence of Magicka",
  key: "intellect-protection-magicka-restore-resistance-spell",
  description: "Grants Increase Spell Resistance, Restore Magicka, Protection.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  recipes: [
    {
      reagents: [
        "temper-reagent/bugloss",
        "temper-reagent/mudcrab-chitin",
        "temper-reagent/vile-coagulant",
      ],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
