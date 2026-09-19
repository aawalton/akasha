import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const runesmith = {
  id: "01a0657e-0249-7c57-83ab-370e99e702d1",
  type: "page-type/world-class",
  slug: "runesmith",
  title: "Runesmith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
