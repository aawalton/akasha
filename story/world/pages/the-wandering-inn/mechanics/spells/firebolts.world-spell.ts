import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const firebolts = {
  id: "01a06572-95c2-7776-a8e0-93059593fcfa",
  type: "page-type/world-spell",
  slug: "firebolts",
  title: "Firebolts",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.394Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
