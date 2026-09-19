import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knights = {
  id: "01a0657e-1384-7705-a96b-3165d1a50db6",
  type: "page-type/world-class",
  slug: "knights",
  title: "Knights",
  world: "world/the-wandering-inn",
  aliases: ["Knights."],
  references: "jsonl",
} as const satisfies WorldClass
