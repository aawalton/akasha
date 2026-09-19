import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const grappler = {
  id: "01a0657e-136d-79ac-9c5f-f79353a92db6",
  type: "page-type/world-class",
  slug: "grappler",
  title: "Grappler",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
