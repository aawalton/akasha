import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfPotentHealth = {
  id: "01a05fd8-a44e-7681-b1b9-13d81c4cbd1f",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-potent-health",
  title: "Essence of Potent Health",
  key: "essence-of-potent-health",
  description:
    "Restore 7352 Health immediately. Grants Major Fortitude which increases your Health Regeneration by 30% for 22.1 seconds. Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
  displayOrder: 3,
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  itemId: 176041,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionDropped
