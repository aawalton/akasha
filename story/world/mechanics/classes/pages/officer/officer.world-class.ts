import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const officer = {
  id: "01a0657e-0235-7c8a-a6e5-582f50e8011b",
  type: "page-type/world-class",
  slug: "officer",
  title: "Officer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
