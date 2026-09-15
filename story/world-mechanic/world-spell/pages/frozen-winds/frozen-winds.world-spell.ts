import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const frozenWinds = {
  id: "01a06572-95c6-7c26-a891-71c93110d520",
  type: "world-spell",
  slug: "frozen-winds",
  title: "Frozen Winds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
