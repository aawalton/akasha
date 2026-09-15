import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const levitate = {
  id: "01a06572-95cd-79a6-a76d-dce8b1f9f5ba",
  type: "world-spell",
  slug: "levitate",
  title: "Levitate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
