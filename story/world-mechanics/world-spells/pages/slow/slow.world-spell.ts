import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const slow = {
  id: "01a06572-95e1-72e3-b893-bc2ecc9fc448",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "slow",
  title: "Slow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
