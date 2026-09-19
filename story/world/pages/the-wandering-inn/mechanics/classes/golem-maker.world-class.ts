import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const golemMaker = {
  id: "01a0657e-136c-737e-b25c-46501a8b2ffd",
  type: "page-type/world-class",
  slug: "golem-maker",
  title: "Golem Maker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
