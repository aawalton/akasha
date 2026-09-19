import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightbridge = {
  id: "01a06572-95cf-7d6d-b2aa-9a20d7ce9037",
  type: "page-type/world-spell",
  slug: "lightbridge",
  title: "Lightbridge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
