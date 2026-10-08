import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weatherMage = {
  id: "01a06586-0a76-74f1-b923-218a523fe575",
  type: "page-type/world-class",
  slug: "weather-mage",
  title: "Weather Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.454Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
