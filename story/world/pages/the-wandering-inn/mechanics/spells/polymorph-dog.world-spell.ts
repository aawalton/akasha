import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const polymorphDog = {
  id: "01a06572-95db-72bf-80f7-e3fc57742c2a",
  type: "page-type/world-spell",
  slug: "polymorph-dog",
  title: "Polymorph: Dog",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
