import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidCloud = {
  id: "01a06572-95b3-77e3-a3c3-48c8369780b0",
  type: "page-type/world-spell",
  slug: "acid-cloud",
  title: "Acid Cloud",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
