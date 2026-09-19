import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const huntsman = {
  id: "01a0657e-1375-709f-b42e-e0fbf290796f",
  type: "page-type/world-class",
  slug: "huntsman",
  title: "Huntsman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
