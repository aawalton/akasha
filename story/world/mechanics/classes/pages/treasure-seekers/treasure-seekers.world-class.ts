import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const treasureSeekers = {
  id: "01a06586-0a6c-798b-b8e3-bdf153f119fb",
  type: "page-type/world-class",
  slug: "treasure-seekers",
  title: "Treasure Seekers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
