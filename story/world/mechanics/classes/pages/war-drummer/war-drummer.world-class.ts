import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warDrummer = {
  id: "01a0657e-0270-71b5-b894-7178b4dabd4a",
  type: "page-type/world-class",
  slug: "war-drummer",
  title: "War Drummer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
