import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const goblinSlayer = {
  id: "01a0657e-01e2-7bfa-9d3d-1e04b4c1d41a",
  type: "page-type/world-class",
  slug: "goblin-slayer",
  title: "Goblin Slayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
