import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const frozenShield = {
  id: "01a06572-95c5-7d82-9aa7-4e560aa3bb3d",
  type: "page-type/world-spell",
  slug: "frozen-shield",
  title: "Frozen Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
