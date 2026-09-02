import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const intellectProtectionMagickaRestoreResistanceSpell = {
  id: "01a05fd8-a44a-73f8-ac6f-e0e8e65244e6",
  pageTypeSlug: "temper-potion-crafted",
  slug: "intellect-protection-magicka-restore-resistance-spell",
  title: "Essence of Magicka",
  key: "intellect-protection-magicka-restore-resistance-spell",
  description: "Grants Increase Spell Resistance, Restore Magicka, Protection.",
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Bugloss", "Mudcrab Chitin", "Vile Coagulant"],
    },
  ],
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionCrafted
