import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massInvisibility = {
  id: "01a06572-95d2-7103-a831-72539c3f5ff4",
  type: "page-type/world-spell",
  slug: "mass-invisibility",
  title: "Mass Invisibility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
