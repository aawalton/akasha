import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massCleanse = {
  id: "01a06572-95d1-7c32-91ca-01fe0d181cf1",
  type: "page-type/world-spell",
  slug: "mass-cleanse",
  title: "Mass Cleanse",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
