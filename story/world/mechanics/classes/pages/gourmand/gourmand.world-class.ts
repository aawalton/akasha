import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gourmand = {
  id: "01a0657e-136d-77c5-8725-6273671000ae",
  type: "page-type/world-class",
  slug: "gourmand",
  title: "Gourmand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
