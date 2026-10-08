import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const runeOfWarmth = {
  id: "01a06572-95de-79fb-95d7-30e26e4ce14a",
  type: "page-type/world-spell",
  slug: "rune-of-warmth",
  title: "Rune of Warmth",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.422Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
