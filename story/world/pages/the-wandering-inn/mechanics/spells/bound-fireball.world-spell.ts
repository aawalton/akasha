import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundFireball = {
  id: "01a06572-95b7-7aa8-89b3-b142284aa21f",
  type: "page-type/world-spell",
  slug: "bound-fireball",
  title: "Bound Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
