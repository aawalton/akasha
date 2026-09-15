import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const caravaneer = {
  id: "01a0657e-01c2-7bf6-86c8-e8bfcf78acac",
  type: "world-class",
  slug: "caravaneer",
  title: "Caravaneer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
