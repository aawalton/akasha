import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningboltVolley = {
  id: "01a06572-95d0-761d-988b-8ea8c983653b",
  type: "page-type/world-spell",
  slug: "lightningbolt-volley",
  title: "Lightningbolt Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
