import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ogreSStrength = {
  id: "01a06572-95da-7eae-8678-d7ba29579b97",
  type: "world-spell",
  slug: "ogre-s-strength",
  title: "Ogre’s Strength",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
