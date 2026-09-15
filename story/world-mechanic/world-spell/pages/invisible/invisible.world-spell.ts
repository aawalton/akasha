import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const invisible = {
  id: "01a06572-95cc-7b67-8a5c-1b9fc2190824",
  type: "world-spell",
  slug: "invisible",
  title: "Invisible",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
