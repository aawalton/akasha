import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const horseBreeders = {
  id: "01a0657e-01f9-7e28-ae2e-8cf96e137f15",
  type: "page-type/world-class",
  slug: "horse-breeders",
  title: "Horse Breeders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
