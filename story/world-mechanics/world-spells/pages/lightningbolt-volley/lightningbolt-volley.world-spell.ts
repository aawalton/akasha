import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningboltVolley = {
  id: "01a06572-95d0-761d-988b-8ea8c983653b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightningbolt-volley",
  title: "Lightningbolt Volley",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
