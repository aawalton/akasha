import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const chainsOfSteel = {
  id: "01a06572-95b8-72b7-90a3-921d37478970",
  type: "page-type/world-spell",
  slug: "chains-of-steel",
  title: "Chains of Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
