import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const maid = {
  id: "01a0657e-139c-79db-b0bf-64de1324b803",
  type: "page-type/world-class",
  slug: "maid",
  title: "Maid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
