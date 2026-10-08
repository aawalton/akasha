import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const meteorStrike = {
  id: "01a06572-95d8-7873-b6ac-7ea03851484c",
  type: "page-type/world-spell",
  slug: "meteor-strike",
  title: "Meteor Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.416Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
