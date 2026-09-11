import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const muddyGround = {
  id: "01a06572-95d9-79ee-8354-9fdf43b98619",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "muddy-ground",
  title: "Muddy Ground",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
