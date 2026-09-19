import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const featherfall = {
  id: "01a06572-95c0-77d6-90b8-329556563912",
  type: "page-type/world-spell",
  slug: "featherfall",
  title: "Featherfall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
