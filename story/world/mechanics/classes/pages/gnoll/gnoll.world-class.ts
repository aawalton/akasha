import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gnoll = {
  id: "01a0657e-01e2-7641-8ee1-f4ef350efd88",
  type: "page-type/world-class",
  slug: "gnoll",
  title: "Gnoll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
