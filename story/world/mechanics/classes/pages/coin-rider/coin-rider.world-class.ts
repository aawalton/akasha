import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const coinRider = {
  id: "01a0657e-01c7-7b03-8391-f3a4a192f748",
  type: "page-type/world-class",
  slug: "coin-rider",
  title: "Coin Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
