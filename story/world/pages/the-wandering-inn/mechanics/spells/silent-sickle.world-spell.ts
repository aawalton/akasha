import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const silentSickle = {
  id: "01a06572-95e1-7d64-b7da-e301bdf1771d",
  type: "page-type/world-spell",
  slug: "silent-sickle",
  title: "Silent Sickle",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
