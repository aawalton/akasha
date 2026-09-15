import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const detectIntention = {
  id: "01a06572-95bc-7927-9553-cda66abc5259",
  type: "world-spell",
  slug: "detect-intention",
  title: "Detect Intention",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
