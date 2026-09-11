import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const polymorphDog = {
  id: "01a06572-95db-72bf-80f7-e3fc57742c2a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "polymorph-dog",
  title: "Polymorph: Dog",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
