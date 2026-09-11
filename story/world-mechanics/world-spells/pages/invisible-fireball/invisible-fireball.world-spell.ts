import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const invisibleFireball = {
  id: "01a06572-95cc-74d4-9eb5-93ab0902d74e",
  type: "world-spell",
  slug: "invisible-fireball",
  title: "Invisible Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
