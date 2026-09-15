import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const wildShaman = {
  id: "01a06586-0a76-7867-a177-2bbad98160e5",
  type: "world-class",
  slug: "wild-shaman",
  title: "Wild Shaman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
