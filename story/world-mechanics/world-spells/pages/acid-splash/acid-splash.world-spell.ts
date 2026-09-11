import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const acidSplash = {
  id: "01a06572-95b3-75c7-8fa7-fa7dbae444c0",
  type: "world-spell",
  slug: "acid-splash",
  title: "Acid Splash",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
