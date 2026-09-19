import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireballVolley = {
  id: "01a06572-95c1-7044-b5bb-b9f81174c462",
  type: "page-type/world-spell",
  slug: "fireball-volley",
  title: "Fireball Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
