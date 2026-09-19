import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massEnchantmentHaste = {
  id: "01a06572-95d1-7a41-9bd9-33cd546bdd6f",
  type: "page-type/world-spell",
  slug: "mass-enchantment-haste",
  title: "Mass Enchantment: Haste",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
