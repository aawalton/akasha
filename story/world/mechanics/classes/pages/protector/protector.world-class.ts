import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const protector = {
  id: "01a06586-0a19-74b0-a5f4-dff4eb7905f1",
  type: "page-type/world-class",
  slug: "protector",
  title: "Protector",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
