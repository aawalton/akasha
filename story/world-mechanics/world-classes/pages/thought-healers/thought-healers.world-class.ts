import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const thoughtHealers = {
  id: "01a06586-0a67-7063-a400-922e576c1f0a",
  type: "world-class",
  slug: "thought-healers",
  title: "Thought Healers",
  world: "the-wandering-inn",
  aliases: ["Thought-Healers"],
  references: "jsonl",
} as const satisfies WorldClass
