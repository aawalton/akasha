import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfPotentMagicka = {
  id: "01a05fd8-a44e-7daa-bebf-7ee5281e50bf",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-potent-magicka",
  title: "Essence of Potent Magicka",
  key: "essence-of-potent-magicka",
  description:
    "Grants Major Sorcery which increases your Spell Damage by 20% for 22.1 seconds. Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
  displayOrder: 4,
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  itemId: 176040,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
} as const satisfies TemperPotionDropped
