import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const birdwatchers = {
  id: "01a0657e-133e-7647-b6d7-341d29f5394b",
  type: "page-type/world-class",
  slug: "birdwatchers",
  title: "Birdwatchers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
