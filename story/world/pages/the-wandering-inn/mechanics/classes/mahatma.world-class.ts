import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mahatma = {
  id: "01a0657e-139b-7ec5-9baf-9869dd20166f",
  type: "page-type/world-class",
  slug: "mahatma",
  title: "Mahatma",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
