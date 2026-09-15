import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const grimalkinSPhysique = {
  id: "01a06572-95c7-7f9f-91d0-8610cfa98884",
  type: "world-spell",
  slug: "grimalkin-s-physique",
  title: "Grimalkin’s Physique",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
