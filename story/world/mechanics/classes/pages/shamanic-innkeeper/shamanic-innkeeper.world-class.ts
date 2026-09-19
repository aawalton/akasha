import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shamanicInnkeeper = {
  id: "01a06586-0a38-7a41-8ac2-b7866e41d109",
  type: "page-type/world-class",
  slug: "shamanic-innkeeper",
  title: "Shamanic Innkeeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
