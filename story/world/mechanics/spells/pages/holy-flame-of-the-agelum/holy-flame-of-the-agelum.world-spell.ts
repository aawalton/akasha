import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const holyFlameOfTheAgelum = {
  id: "01a06572-95c8-7a8f-900b-e62e55a8073d",
  type: "page-type/world-spell",
  slug: "holy-flame-of-the-agelum",
  title: "Holy Flame of the Agelum",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
