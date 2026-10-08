import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const icyLances = {
  id: "01a06572-95cb-74c8-bd26-7d983e07df1a",
  type: "page-type/world-spell",
  slug: "icy-lances",
  title: "Icy Lances",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
