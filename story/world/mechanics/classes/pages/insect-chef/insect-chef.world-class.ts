import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const insectChef = {
  id: "01a0657e-1377-7e45-b1fb-f7d947bb575d",
  type: "page-type/world-class",
  slug: "insect-chef",
  title: "Insect Chef",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
