import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fly = {
  id: "01a06572-95c4-7ec0-be46-c3fefc5b715a",
  type: "page-type/world-spell",
  slug: "fly",
  title: "Fly",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
