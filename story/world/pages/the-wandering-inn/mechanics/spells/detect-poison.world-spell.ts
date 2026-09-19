import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectPoison = {
  id: "01a06572-95bd-73fd-aa2b-5ac559ae4e95",
  type: "page-type/world-spell",
  slug: "detect-poison",
  title: "Detect Poison",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
