import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magician = {
  id: "01a0657e-022b-7280-860f-ebcab075f302",
  type: "page-type/world-class",
  slug: "magician",
  title: "Magician",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
