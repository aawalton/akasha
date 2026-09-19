import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weatherRanger = {
  id: "01a06586-0a76-7ba1-a648-1f3f86bc82b5",
  type: "page-type/world-class",
  slug: "weather-ranger",
  title: "Weather Ranger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
