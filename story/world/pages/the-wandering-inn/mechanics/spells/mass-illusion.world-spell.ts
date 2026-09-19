import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massIllusion = {
  id: "01a06572-95d2-7c00-86cb-37c2b9442179",
  type: "page-type/world-spell",
  slug: "mass-illusion",
  title: "Mass Illusion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
