import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfStrengthDrain = {
  id: "01a06572-95dc-7437-91d7-b79415e0fc36",
  type: "world-spell",
  slug: "ray-of-strength-drain",
  title: "Ray of Strength Drain",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
