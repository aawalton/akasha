import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const meteor = {
  id: "01a06572-95d8-7c3a-b1da-9bda7a2953dc",
  type: "page-type/world-spell",
  slug: "meteor",
  title: "Meteor",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.416Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
