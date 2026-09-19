import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const snapFroze = {
  id: "01a06572-95e1-7bf2-bb51-871d51fb1d1b",
  type: "page-type/world-spell",
  slug: "snap-froze",
  title: "Snap Froze",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
