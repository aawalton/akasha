import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const invisible = {
  id: "01a06572-95cc-7b67-8a5c-1b9fc2190824",
  type: "page-type/world-spell",
  slug: "invisible",
  title: "Invisible",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
