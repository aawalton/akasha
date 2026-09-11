import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boneDarts = {
  id: "01a06572-95b7-7c84-a3ab-c0587e0e3e21",
  type: "world-spell",
  slug: "bone-darts",
  title: "Bone Darts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
