import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const ambassador = {
  id: "01a0657e-132c-7d75-ae62-d2d0febb427b",
  type: "page-type/world-class",
  slug: "ambassador",
  title: "Ambassador",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
