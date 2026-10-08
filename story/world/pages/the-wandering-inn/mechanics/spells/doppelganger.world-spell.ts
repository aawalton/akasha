import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const doppelganger = {
  id: "01a06572-95be-703c-b47c-8e36590e9b5b",
  type: "page-type/world-spell",
  slug: "doppelganger",
  title: "Doppelganger",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
