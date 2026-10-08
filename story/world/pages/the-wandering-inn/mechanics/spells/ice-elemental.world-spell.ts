import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceElemental = {
  id: "01a06572-95c9-7c05-a2ea-a3b67ca30dbf",
  type: "page-type/world-spell",
  slug: "ice-elemental",
  title: "Ice Elemental",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.401Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
