import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lavaOrb = {
  id: "01a06572-95cc-70ba-925f-de8d475f9315",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lava-orb",
  title: "Lava Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
