import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const director = {
  id: "01a0657e-1353-7912-920a-edf592b351bd",
  type: "world-class",
  slug: "director",
  title: "Director",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
