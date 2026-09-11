import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const reduceSize = {
  id: "01a06572-95dc-729a-8642-1420c3a323a4",
  type: "world-spell",
  slug: "reduce-size",
  title: "Reduce Size",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
