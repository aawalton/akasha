import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const rumorJournalists = {
  id: "01a06586-0a27-7e8b-9dc1-555615b143be",
  type: "world-class",
  slug: "rumor-journalists",
  title: "Rumor Journalists",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
