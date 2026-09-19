import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const seaLady = {
  id: "01a06586-0a2d-739c-bdb4-38041abab3f9",
  type: "page-type/world-class",
  slug: "sea-lady",
  title: "Sea Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
