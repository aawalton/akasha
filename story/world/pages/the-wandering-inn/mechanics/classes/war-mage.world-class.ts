import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warMage = {
  id: "01a0657e-0270-7568-a272-c959656493bf",
  type: "page-type/world-class",
  slug: "war-mage",
  title: "War Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
