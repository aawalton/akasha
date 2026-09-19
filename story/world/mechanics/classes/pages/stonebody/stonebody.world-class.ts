import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const stonebody = {
  id: "01a06586-0a54-7460-8c14-0ddd5b44ac76",
  type: "page-type/world-class",
  slug: "stonebody",
  title: "Stonebody",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
