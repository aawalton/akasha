import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const flirt = {
  id: "01a0657e-1365-7ec4-8eca-ae4da6a7c545",
  type: "page-type/world-class",
  slug: "flirt",
  title: "Flirt",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
