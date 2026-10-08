import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const enlargePerson = {
  id: "01a06572-95bf-7079-a9be-9133c0f281fe",
  type: "page-type/world-spell",
  slug: "enlarge-person",
  title: "Enlarge Person",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
