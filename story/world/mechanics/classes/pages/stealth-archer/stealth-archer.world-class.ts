import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stealthArcher = {
  id: "01a0657e-025f-7fc0-8df0-86b13d1844e5",
  type: "page-type/world-class",
  slug: "stealth-archer",
  title: "Stealth Archer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
