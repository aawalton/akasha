import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const faithSeekers = {
  id: "01a0657e-1361-75b5-8064-66313369e804",
  type: "page-type/world-class",
  slug: "faith-seekers",
  title: "Faith Seekers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
