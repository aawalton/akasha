import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const silence = {
  id: "01a06572-95e0-7ca6-8b6f-4152fbb5d799",
  type: "page-type/world-spell",
  slug: "silence",
  title: "Silence",
  world: "world/the-wandering-inn",
  appearanceCount: 74,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.424Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
