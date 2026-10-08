import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const graceOfGod = {
  id: "01a06572-95c6-72e4-8cc4-cdd4cab08c01",
  type: "page-type/world-spell",
  slug: "grace-of-god",
  title: "Grace of God",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
