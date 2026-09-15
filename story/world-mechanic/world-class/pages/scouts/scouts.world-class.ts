import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const scouts = {
  id: "01a06586-0a2c-7979-bc71-0f6bc5410584",
  type: "world-class",
  slug: "scouts",
  title: "Scouts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
