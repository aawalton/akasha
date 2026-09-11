import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fireballVolley = {
  id: "01a06572-95c1-7044-b5bb-b9f81174c462",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "fireball-volley",
  title: "Fireball Volley",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
