import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warriorPrincess = {
  id: "01a06586-0a72-721f-9dea-70d8ea7c70fa",
  type: "page-type/world-class",
  slug: "warrior-princess",
  title: "Warrior Princess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
