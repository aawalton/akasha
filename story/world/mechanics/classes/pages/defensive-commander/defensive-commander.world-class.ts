import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const defensiveCommander = {
  id: "01a0657e-1352-7030-b731-4e1933eab0ab",
  type: "page-type/world-class",
  slug: "defensive-commander",
  title: "Defensive Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
