import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const weatherMage = {
  id: "01a06586-0a76-74f1-b923-218a523fe575",
  type: "page-type/world-class",
  slug: "weather-mage",
  title: "Weather Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
