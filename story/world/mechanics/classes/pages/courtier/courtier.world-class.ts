import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courtier = {
  id: "01a0657e-1350-716c-8967-f2d2f60f2782",
  type: "page-type/world-class",
  slug: "courtier",
  title: "Courtier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
