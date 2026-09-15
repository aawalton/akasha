import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const personalLevitation = {
  id: "01a06572-95da-78d2-a1f4-5e8af47e4f53",
  type: "world-spell",
  slug: "personal-levitation",
  title: "Personal Levitation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
