import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const treasureHunters = {
  id: "01a06586-0a6c-7e62-9b6e-dc790a68496b",
  type: "world-class",
  slug: "treasure-hunters",
  title: "Treasure Hunters",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
