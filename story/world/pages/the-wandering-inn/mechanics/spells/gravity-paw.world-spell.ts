import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gravityPaw = {
  id: "01a06572-95c6-7922-9f07-12704ed267e4",
  type: "page-type/world-spell",
  slug: "gravity-paw",
  title: "Gravity Paw",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.398Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
