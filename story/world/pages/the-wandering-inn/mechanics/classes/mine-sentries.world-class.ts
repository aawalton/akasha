import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mineSentries = {
  id: "01a0657e-13a2-7a9e-a5bf-f2356ad9b55d",
  type: "page-type/world-class",
  slug: "mine-sentries",
  title: "Mine Sentries",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
