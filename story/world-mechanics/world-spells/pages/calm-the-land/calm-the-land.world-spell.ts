import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const calmTheLand = {
  id: "01a06572-95b8-7a04-8917-69c8a3ad352c",
  type: "world-spell",
  slug: "calm-the-land",
  title: "Calm the Land",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
