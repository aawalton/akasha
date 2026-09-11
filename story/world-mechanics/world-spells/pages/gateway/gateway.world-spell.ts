import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const gateway = {
  id: "01a06572-95c6-7ec0-bc47-4d31d4d79c9d",
  type: "world-spell",
  slug: "gateway",
  title: "Gateway",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
