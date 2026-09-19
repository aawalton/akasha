import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightCaptain = {
  id: "01a0657e-020d-78d9-84c3-d9709333bb19",
  type: "page-type/world-class",
  slug: "knight-captain",
  title: "Knight-Captain",
  world: "world/the-wandering-inn",
  aliases: ["Knight Captain"],
  references: "jsonl",
} as const satisfies WorldClass
