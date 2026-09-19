import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const overseer = {
  id: "01a0657e-0235-7cd9-bedc-97a4df249971",
  type: "page-type/world-class",
  slug: "overseer",
  title: "Overseer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
