import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const chainsOfSteel = {
  id: "01a06572-95b8-72b7-90a3-921d37478970",
  type: "world-spell",
  slug: "chains-of-steel",
  title: "Chains of Steel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
