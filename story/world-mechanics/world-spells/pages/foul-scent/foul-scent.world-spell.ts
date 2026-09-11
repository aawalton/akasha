import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const foulScent = {
  id: "01a06572-95c5-7fdf-9404-e269cd44eef3",
  type: "world-spell",
  slug: "foul-scent",
  title: "Foul Scent",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
