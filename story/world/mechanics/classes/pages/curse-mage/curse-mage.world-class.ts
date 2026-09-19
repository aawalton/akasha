import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const curseMage = {
  id: "01a0657e-1351-7e8f-8666-6692978d395f",
  type: "page-type/world-class",
  slug: "curse-mage",
  title: "Curse Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
