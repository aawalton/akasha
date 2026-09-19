import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const professors = {
  id: "01a0657e-0240-777e-8845-bccb0c92d4ad",
  type: "page-type/world-class",
  slug: "professors",
  title: "Professors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
