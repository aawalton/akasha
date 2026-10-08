import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const animateDead = {
  id: "01a06572-95b4-732c-aba8-c5f742f5c56a",
  type: "page-type/world-spell",
  slug: "animate-dead",
  title: "Animate Dead",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.380Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
