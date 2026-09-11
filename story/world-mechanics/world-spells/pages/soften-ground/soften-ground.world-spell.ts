import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const softenGround = {
  id: "01a06572-95e1-7581-8322-dbdfb0d65536",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "soften-ground",
  title: "Soften Ground",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
