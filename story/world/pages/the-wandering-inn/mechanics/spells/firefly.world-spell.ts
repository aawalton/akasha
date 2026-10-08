import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const firefly = {
  id: "01a06572-95c2-7ee8-baf2-92618d31c5e4",
  type: "page-type/world-spell",
  slug: "firefly",
  title: "Firefly",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.394Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
