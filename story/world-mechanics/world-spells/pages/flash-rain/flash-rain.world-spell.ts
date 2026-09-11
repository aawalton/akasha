import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashRain = {
  id: "01a06572-95c3-74cb-a853-67d73bde965c",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flash-rain",
  title: "Flash Rain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
