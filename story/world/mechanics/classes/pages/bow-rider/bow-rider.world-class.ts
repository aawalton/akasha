import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bowRider = {
  id: "01a0657e-1340-7637-8729-5f2451a2f10c",
  type: "page-type/world-class",
  slug: "bow-rider",
  title: "Bow Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
