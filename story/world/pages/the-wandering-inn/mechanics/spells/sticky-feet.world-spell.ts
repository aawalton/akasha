import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stickyFeet = {
  id: "01a06572-95e3-7510-bcd9-29eb8c1bc8a3",
  type: "page-type/world-spell",
  slug: "sticky-feet",
  title: "Sticky Feet",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
