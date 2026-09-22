import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const robbers = {
  id: "01a0657e-0247-7c89-9de1-ef9dbbf80b33",
  type: "page-type/world-class",
  slug: "robbers",
  title: "Robbers",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
