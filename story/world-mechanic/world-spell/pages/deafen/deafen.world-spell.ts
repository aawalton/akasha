import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const deafen = {
  id: "01a06572-95bb-71cf-a997-a953eef042e3",
  type: "world-spell",
  slug: "deafen",
  title: "Deafen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
