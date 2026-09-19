import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knitter = {
  id: "01a0657e-0218-7eae-a8cf-6adbb1a15ebf",
  type: "page-type/world-class",
  slug: "knitter",
  title: "Knitter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
