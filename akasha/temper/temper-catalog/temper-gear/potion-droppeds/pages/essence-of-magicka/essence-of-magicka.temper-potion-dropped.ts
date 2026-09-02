import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfMagicka = {
  id: "01a05fd8-a44d-780d-b3d4-4311194f3401",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-magicka",
  title: "Essence of Magicka",
  key: "essence-of-magicka",
  description:
    "Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
  displayOrder: 1,
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  itemId: 27037,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
} as const satisfies TemperPotionDropped
