import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfDisintegration = {
  id: "01a06572-95dc-7149-aeb1-c6fb702c57c1",
  type: "world-spell",
  slug: "ray-of-disintegration",
  title: "Ray of Disintegration",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
