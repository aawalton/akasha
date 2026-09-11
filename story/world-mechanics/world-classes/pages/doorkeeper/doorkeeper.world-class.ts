import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const doorkeeper = {
  id: "01a0657e-01d1-788a-9d27-22f6bde9e2ad",
  type: "world-class",
  slug: "doorkeeper",
  title: "Doorkeeper",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
