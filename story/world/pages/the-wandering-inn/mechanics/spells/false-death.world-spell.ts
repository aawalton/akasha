import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const falseDeath = {
  id: "01a06572-95bf-73f5-9f86-18d59d1433c8",
  type: "page-type/world-spell",
  slug: "false-death",
  title: "False Death",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
