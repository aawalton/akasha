import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const intellectProtectionMagickaRestoreResistanceSpell = {
  id: "019e21f6-405f-723a-823f-388d7e848b7c",
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
} as const satisfies TemperPotionCrafted
