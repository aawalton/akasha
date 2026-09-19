import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gumChewer = {
  id: "01a0657e-1370-740b-9c86-4e609f352917",
  type: "page-type/world-class",
  slug: "gum-chewer",
  title: "Gum Chewer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
