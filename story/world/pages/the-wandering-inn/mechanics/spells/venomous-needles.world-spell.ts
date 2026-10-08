import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const venomousNeedles = {
  id: "01a06572-95e8-7c72-8cf1-e5f66b9529d2",
  type: "page-type/world-spell",
  slug: "venomous-needles",
  title: "Venomous Needles",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
