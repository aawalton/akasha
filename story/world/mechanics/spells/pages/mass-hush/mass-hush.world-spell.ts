import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massHush = {
  id: "01a06572-95d2-7352-8257-5e596c93c268",
  type: "page-type/world-spell",
  slug: "mass-hush",
  title: "Mass Hush",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
