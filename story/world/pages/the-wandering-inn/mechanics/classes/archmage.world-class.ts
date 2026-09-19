import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archmage = {
  id: "01a0657e-132f-79bc-8302-6383b710fb22",
  type: "page-type/world-class",
  slug: "archmage",
  title: "Archmage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
