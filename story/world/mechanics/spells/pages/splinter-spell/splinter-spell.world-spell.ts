import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const splinterSpell = {
  id: "01a06572-95e2-7513-bf85-de94211ce04d",
  type: "page-type/world-spell",
  slug: "splinter-spell",
  title: "Splinter Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
