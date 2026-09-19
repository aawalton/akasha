import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massHasted = {
  id: "01a06572-95d2-7d18-8488-0881abbc0028",
  type: "page-type/world-spell",
  slug: "mass-hasted",
  title: "Mass Hasted",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
