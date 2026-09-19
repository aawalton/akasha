import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const governess = {
  id: "01a0657e-136d-72c9-83ad-c5418a1f6aa0",
  type: "page-type/world-class",
  slug: "governess",
  title: "Governess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
