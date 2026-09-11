import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const subtleStench = {
  id: "01a06572-95e4-7d91-ab48-02544c196309",
  type: "world-spell",
  slug: "subtle-stench",
  title: "Subtle Stench",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
