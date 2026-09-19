import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const footpad = {
  id: "01a0657e-1365-700c-a4f8-bad02f9529c3",
  type: "page-type/world-class",
  slug: "footpad",
  title: "Footpad",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
