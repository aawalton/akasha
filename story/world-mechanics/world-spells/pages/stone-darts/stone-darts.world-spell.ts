import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneDarts = {
  id: "01a06572-95e3-7351-8962-4d58eb5e6612",
  type: "world-spell",
  slug: "stone-darts",
  title: "Stone Darts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
