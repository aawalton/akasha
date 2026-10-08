import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidOrb = {
  id: "01a06572-95b3-7c38-9cce-4ab225b4140c",
  type: "page-type/world-spell",
  slug: "acid-orb",
  title: "Acid Orb",
  world: "world/the-wandering-inn",
  appearanceCount: 14,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.379Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
