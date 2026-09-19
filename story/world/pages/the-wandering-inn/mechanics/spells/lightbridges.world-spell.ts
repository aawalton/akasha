import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightbridges = {
  id: "01a06572-95cf-7f54-b1a4-fc623eda80ee",
  type: "page-type/world-spell",
  slug: "lightbridges",
  title: "Lightbridges",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
