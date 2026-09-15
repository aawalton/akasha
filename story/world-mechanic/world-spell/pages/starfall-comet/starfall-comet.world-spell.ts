import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const starfallComet = {
  id: "01a06572-95e2-7f30-a62b-e0972469d636",
  type: "world-spell",
  slug: "starfall-comet",
  title: "Starfall Comet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
