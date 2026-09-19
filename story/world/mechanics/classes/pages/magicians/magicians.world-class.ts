import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicians = {
  id: "01a0657e-139b-730d-a6de-79891867c55a",
  type: "page-type/world-class",
  slug: "magicians",
  title: "Magicians",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
