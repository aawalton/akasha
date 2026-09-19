import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const acidStorm = {
  id: "01a06572-95b3-71ee-89ba-5ce606fffc10",
  type: "page-type/world-spell",
  slug: "acid-storm",
  title: "Acid Storm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
