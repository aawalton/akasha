import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rayOfEntropy = {
  id: "01a06572-95dc-7f24-8821-9f8a0ab75c0a",
  type: "page-type/world-spell",
  slug: "ray-of-entropy",
  title: "Ray of Entropy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
