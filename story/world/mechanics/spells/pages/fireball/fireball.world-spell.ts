import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireball = {
  id: "01a06572-95c2-741f-886e-95cb617df47d",
  type: "page-type/world-spell",
  slug: "fireball",
  title: "Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
