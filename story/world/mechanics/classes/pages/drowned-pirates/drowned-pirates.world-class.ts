import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drownedPirates = {
  id: "01a0657e-01d2-7748-be22-fb7f7b8732d6",
  type: "page-type/world-class",
  slug: "drowned-pirates",
  title: "Drowned Pirates",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
