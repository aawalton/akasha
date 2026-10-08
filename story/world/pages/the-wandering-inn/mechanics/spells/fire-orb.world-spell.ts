import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireOrb = {
  id: "01a06572-95c0-70ff-af89-9ed0607fae68",
  type: "page-type/world-spell",
  slug: "fire-orb",
  title: "Fire Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
