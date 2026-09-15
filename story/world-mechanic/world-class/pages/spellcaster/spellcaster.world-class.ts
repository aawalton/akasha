import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const spellcaster = {
  id: "01a06586-0a50-7778-8f11-1f785253bcdc",
  type: "world-class",
  slug: "spellcaster",
  title: "Spellcaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
