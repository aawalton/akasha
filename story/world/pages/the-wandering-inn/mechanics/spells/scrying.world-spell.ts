import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scrying = {
  id: "01a06572-95df-7f4f-95fa-c51edf739378",
  type: "page-type/world-spell",
  slug: "scrying",
  title: "Scrying",
  world: "world/the-wandering-inn",
  appearanceCount: 94,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.423Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
