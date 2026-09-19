import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massSpeed = {
  id: "01a06572-95d2-781d-b780-a3654c3abb00",
  type: "page-type/world-spell",
  slug: "mass-speed",
  title: "Mass Speed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
