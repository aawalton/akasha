import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gourmets = {
  id: "01a0657e-01e3-78fb-a87f-f1b92ac2d248",
  type: "page-type/world-class",
  slug: "gourmets",
  title: "Gourmets",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
