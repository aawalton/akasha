import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBeam = {
  id: "01a06572-95ce-73b8-8f84-317061612465",
  type: "page-type/world-spell",
  slug: "light-beam",
  title: "Light Beam",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
