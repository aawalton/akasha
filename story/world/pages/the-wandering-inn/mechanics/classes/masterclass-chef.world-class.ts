import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const masterclassChef = {
  id: "01a0657e-022f-7771-82ba-28d628d450de",
  type: "page-type/world-class",
  slug: "masterclass-chef",
  title: "Masterclass Chef",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
