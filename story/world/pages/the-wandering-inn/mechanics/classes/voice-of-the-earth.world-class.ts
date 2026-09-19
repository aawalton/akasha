import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const voiceOfTheEarth = {
  id: "01a06586-0a70-7892-8fda-c76118c897d8",
  type: "page-type/world-class",
  slug: "voice-of-the-earth",
  title: "Voice of the Earth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
