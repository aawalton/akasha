import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const treasureHunters = {
  id: "01a06586-0a6c-7e62-9b6e-dc790a68496b",
  type: "page-type/world-class",
  slug: "treasure-hunters",
  title: "Treasure Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
