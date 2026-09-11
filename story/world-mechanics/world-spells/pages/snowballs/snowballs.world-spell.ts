import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const snowballs = {
  id: "01a06572-95e1-7aee-aab2-b4447601ff04",
  type: "world-spell",
  slug: "snowballs",
  title: "Snowballs",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
