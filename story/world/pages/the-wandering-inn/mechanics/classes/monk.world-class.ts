import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const monk = {
  id: "01a0657e-13a3-75cc-a2fb-a5be4c3dc7f3",
  type: "page-type/world-class",
  slug: "monk",
  title: "Monk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
