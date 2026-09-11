import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stun = {
  id: "01a06572-95e4-76a7-a8d0-dedd491c84ab",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stun",
  title: "Stun",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
