import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const boneFracture = {
  id: "01a06572-95b7-7ceb-9f61-df427988da54",
  type: "world-spell",
  slug: "bone-fracture",
  title: "Bone Fracture",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
