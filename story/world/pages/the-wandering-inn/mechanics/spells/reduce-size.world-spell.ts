import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const reduceSize = {
  id: "01a06572-95dc-729a-8642-1420c3a323a4",
  type: "page-type/world-spell",
  slug: "reduce-size",
  title: "Reduce Size",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
