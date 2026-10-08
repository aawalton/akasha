import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flamingMeteor = {
  id: "01a06572-95c3-73ee-9842-58e7df08f434",
  type: "page-type/world-spell",
  slug: "flaming-meteor",
  title: "Flaming Meteor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.395Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
