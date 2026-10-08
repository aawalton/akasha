import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deathWail = {
  id: "01a06572-95bb-7a6c-8671-9f12c138b89c",
  type: "page-type/world-spell",
  slug: "death-wail",
  title: "Death Wail",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
