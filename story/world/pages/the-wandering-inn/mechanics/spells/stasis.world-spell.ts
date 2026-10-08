import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stasis = {
  id: "01a06572-95e2-761d-b9be-168a19755bfb",
  type: "page-type/world-spell",
  slug: "stasis",
  title: "Stasis",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
