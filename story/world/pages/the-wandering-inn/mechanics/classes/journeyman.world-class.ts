import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const journeyman = {
  id: "01a0657e-1378-7421-a14a-a5bde664ddb9",
  type: "page-type/world-class",
  slug: "journeyman",
  title: "Journeyman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
