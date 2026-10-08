import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const familiar = {
  id: "01a06572-95bf-764c-9be1-de3bf148f6a5",
  type: "page-type/world-spell",
  slug: "familiar",
  title: "Familiar",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
