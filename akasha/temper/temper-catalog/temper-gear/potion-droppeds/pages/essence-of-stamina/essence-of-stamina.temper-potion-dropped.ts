import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfStamina = {
  id: "01a05fd8-a44f-7e06-aa71-9040a8969908",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-stamina",
  title: "Essence of Stamina",
  key: "essence-of-stamina",
  description:
    "Restore 6066 Stamina immediately. Grants Major Endurance which increases your Stamina Regeneration by 30% for 22.1 seconds.",
  displayOrder: 2,
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  itemId: 27038,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
} as const satisfies TemperPotionDropped
