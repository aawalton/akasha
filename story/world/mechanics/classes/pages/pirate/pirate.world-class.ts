import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirate = {
  id: "01a06586-0a08-76ac-b0ca-d2deee8ffbbf",
  type: "page-type/world-class",
  slug: "pirate",
  title: "Pirate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
