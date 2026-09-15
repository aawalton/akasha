import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const astralBinding = {
  id: "01a06572-95b5-73bf-8c5d-05e82efbd217",
  type: "world-spell",
  slug: "astral-binding",
  title: "Astral Binding",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
