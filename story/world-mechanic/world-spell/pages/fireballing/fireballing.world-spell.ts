import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const fireballing = {
  id: "01a06572-95c2-750b-a20c-5f94c92591de",
  type: "world-spell",
  slug: "fireballing",
  title: "Fireballing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
