import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const raider = {
  id: "01a0657e-0243-719f-91f1-a11c32fc7def",
  type: "page-type/world-class",
  slug: "raider",
  title: "Raider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
