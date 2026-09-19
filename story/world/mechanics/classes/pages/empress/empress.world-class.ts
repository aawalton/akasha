import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const empress = {
  id: "01a0657e-01d7-7ab9-a9f4-a4d4d8016357",
  type: "page-type/world-class",
  slug: "empress",
  title: "Empress",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
