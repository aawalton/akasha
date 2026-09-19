import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageHunter = {
  id: "01a0657e-0221-78c2-9f44-1c4c8b79332f",
  type: "page-type/world-class",
  slug: "mage-hunter",
  title: "Mage Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
