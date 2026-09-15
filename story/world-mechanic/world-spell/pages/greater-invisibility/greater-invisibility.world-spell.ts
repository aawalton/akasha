import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const greaterInvisibility = {
  id: "01a06572-95c7-7a22-99aa-d766e73fda2d",
  type: "page-type/world-spell",
  slug: "greater-invisibility",
  title: "Greater Invisibility",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
