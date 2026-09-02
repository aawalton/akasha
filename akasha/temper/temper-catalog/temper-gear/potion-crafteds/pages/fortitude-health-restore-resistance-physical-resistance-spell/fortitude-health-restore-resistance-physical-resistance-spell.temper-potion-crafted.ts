import type { TemperPotionCrafted } from "../../temper-potion-crafted.page-type.ts"

export const fortitudeHealthRestoreResistancePhysicalResistanceSpell = {
  id: "01a05fd8-a447-7535-b340-6536af06a03d",
  pageTypeSlug: "temper-potion-crafted",
  slug: "fortitude-health-restore-resistance-physical-resistance-spell",
  title: "Essence of Health",
  key: "fortitude-health-restore-resistance-physical-resistance-spell",
  description: "Grants Restore Health, Increase Spell Resistance, Increase Physical Resistance.",
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  level: "CP150",
  seconds: 47,
  reagents: [
    {
      names: ["Bugloss", "Mountain Flower", "Mudcrab Chitin"],
    },
  ],
  effects: "jsonl",
} as const satisfies TemperPotionCrafted
