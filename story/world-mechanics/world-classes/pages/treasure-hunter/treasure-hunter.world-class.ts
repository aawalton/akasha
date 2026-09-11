import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const treasureHunter = {
  id: "01a0657e-026d-7667-9916-ec0b6449d9fb",
  type: "world-class",
  slug: "treasure-hunter",
  title: "Treasure Hunter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
