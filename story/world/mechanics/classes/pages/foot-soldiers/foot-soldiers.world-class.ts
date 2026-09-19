import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const footSoldiers = {
  id: "01a0657e-1365-7b77-b062-33903e76bfc1",
  type: "page-type/world-class",
  slug: "foot-soldiers",
  title: "Foot Soldiers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
