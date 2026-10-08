import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const meteorStorm = {
  id: "01a06572-95d8-769c-a7b3-2ea271f1c300",
  type: "page-type/world-spell",
  slug: "meteor-storm",
  title: "Meteor Storm",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.416Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
