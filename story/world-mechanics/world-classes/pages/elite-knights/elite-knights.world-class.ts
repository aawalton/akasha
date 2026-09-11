import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const eliteKnights = {
  id: "01a0657e-1359-7714-bdbc-b12ad9bf590c",
  type: "world-class",
  slug: "elite-knights",
  title: "Elite Knights",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
