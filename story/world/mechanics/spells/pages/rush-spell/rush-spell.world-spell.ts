import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rushSpell = {
  id: "01a06572-95de-71c0-a0f0-171280b76f3b",
  type: "page-type/world-spell",
  slug: "rush-spell",
  title: "Rush Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
