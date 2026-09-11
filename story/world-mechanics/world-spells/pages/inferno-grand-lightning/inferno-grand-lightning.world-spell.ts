import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const infernoGrandLightning = {
  id: "01a06572-95cb-755b-aded-29022171f823",
  type: "world-spell",
  slug: "inferno-grand-lightning",
  title: "Inferno Grand Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
