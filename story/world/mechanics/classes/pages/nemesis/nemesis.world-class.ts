import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const nemesis = {
  id: "01a0657e-0234-70c0-bf7b-d01d4705aacb",
  type: "page-type/world-class",
  slug: "nemesis",
  title: "Nemesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
