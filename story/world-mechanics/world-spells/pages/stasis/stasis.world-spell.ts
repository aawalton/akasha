import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stasis = {
  id: "01a06572-95e2-761d-b9be-168a19755bfb",
  type: "world-spell",
  slug: "stasis",
  title: "Stasis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
