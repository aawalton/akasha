import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cloneOfCete = {
  id: "01a06572-95b9-7703-9348-bfa6fa19c692",
  type: "page-type/world-spell",
  slug: "clone-of-cete",
  title: "Clone of Cete",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
