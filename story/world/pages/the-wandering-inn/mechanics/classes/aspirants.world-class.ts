import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const aspirants = {
  id: "01a0657e-1331-7d9b-baf9-136eee8b24a5",
  type: "page-type/world-class",
  slug: "aspirants",
  title: "Aspirants",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
