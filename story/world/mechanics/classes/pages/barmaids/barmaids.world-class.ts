import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barmaids = {
  id: "01a0657e-133b-76db-a045-935852ea4f81",
  type: "page-type/world-class",
  slug: "barmaids",
  title: "Barmaids",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
