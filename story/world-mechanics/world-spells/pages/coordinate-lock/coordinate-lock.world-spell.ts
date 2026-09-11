import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const coordinateLock = {
  id: "01a06572-95bb-7917-83a1-cc1ad96100e0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "coordinate-lock",
  title: "Coordinate Lock",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
