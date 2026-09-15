import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const levitation = {
  id: "01a06572-95cd-7f21-8fee-7df57084e2ce",
  type: "world-spell",
  slug: "levitation",
  title: "Levitation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
