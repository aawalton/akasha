import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const reducedFireball = {
  id: "01a06572-95dc-7c60-9ef9-6f3c5ead4a23",
  type: "world-spell",
  slug: "reduced-fireball",
  title: "Reduced Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
