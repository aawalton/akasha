import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const miningForewoman = {
  id: "01a0657e-0233-7c82-a10d-f760a8598e9e",
  type: "page-type/world-class",
  slug: "mining-forewoman",
  title: "Mining Forewoman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
