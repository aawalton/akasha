import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fortificationOfMithril = {
  id: "01a06572-95c5-7901-aafc-40c11a07f666",
  type: "page-type/world-spell",
  slug: "fortification-of-mithril",
  title: "Fortification of Mithril",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
