import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicalPin = {
  id: "01a06572-95d1-7c75-9dcf-38b085d8060b",
  type: "page-type/world-spell",
  slug: "magical-pin",
  title: "Magical Pin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
