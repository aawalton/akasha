import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ogreSStrength = {
  id: "01a06572-95da-7eae-8678-d7ba29579b97",
  type: "page-type/world-spell",
  slug: "ogre-s-strength",
  title: "Ogre’s Strength",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
