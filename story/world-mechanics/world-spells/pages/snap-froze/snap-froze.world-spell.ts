import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const snapFroze = {
  id: "01a06572-95e1-7bf2-bb51-871d51fb1d1b",
  type: "world-spell",
  slug: "snap-froze",
  title: "Snap Froze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
