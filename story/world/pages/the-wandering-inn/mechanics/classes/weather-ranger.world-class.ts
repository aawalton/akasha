import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weatherRanger = {
  id: "01a06586-0a76-7ba1-a648-1f3f86bc82b5",
  type: "page-type/world-class",
  slug: "weather-ranger",
  title: "Weather Ranger",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.454Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
