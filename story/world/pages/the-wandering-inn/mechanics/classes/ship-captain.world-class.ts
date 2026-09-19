import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shipCaptain = {
  id: "01a06586-0a3b-76b8-aa39-4243459014d7",
  type: "page-type/world-class",
  slug: "ship-captain",
  title: "Ship Captain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
