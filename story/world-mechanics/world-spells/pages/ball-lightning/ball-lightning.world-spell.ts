import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ballLightning = {
  id: "01a06572-95b5-78b8-9534-3f74f0a4d7aa",
  type: "world-spell",
  slug: "ball-lightning",
  title: "Ball Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
