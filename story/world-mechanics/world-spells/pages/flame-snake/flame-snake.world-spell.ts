import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flameSnake = {
  id: "01a06572-95c3-72fa-b6c1-7ecb9227c44a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flame-snake",
  title: "Flame Snake",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
