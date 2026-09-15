import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const flameWall = {
  id: "01a06572-95c3-7ffb-b947-38bfc48e7de9",
  type: "world-spell",
  slug: "flame-wall",
  title: "Flame Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
