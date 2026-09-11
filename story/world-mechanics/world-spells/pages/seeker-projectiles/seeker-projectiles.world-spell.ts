import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const seekerProjectiles = {
  id: "01a06572-95df-7c18-9b2f-e4d8bad4a254",
  type: "world-spell",
  slug: "seeker-projectiles",
  title: "Seeker Projectiles",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
