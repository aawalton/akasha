import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massEnchantmentHaste = {
  id: "01a06572-95d1-7a41-9bd9-33cd546bdd6f",
  type: "page-type/world-spell",
  slug: "mass-enchantment-haste",
  title: "Mass Enchantment: Haste",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
