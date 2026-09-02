import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfPotentStamina = {
  id: "01a05fd8-a44e-7002-b496-8db814ed568a",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-potent-stamina",
  title: "Essence of Potent Stamina",
  key: "essence-of-potent-stamina",
  description:
    "Grants Major Brutality which increases your Weapon Damage by 20% for 22.1 seconds. Restore 6066 Stamina immediately. Grants Major Endurance which increases your Stamina Regeneration by 30% for 22.1 seconds.",
  displayOrder: 5,
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  itemId: 176042,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
  buffs: "jsonl",
} as const satisfies TemperPotionDropped
