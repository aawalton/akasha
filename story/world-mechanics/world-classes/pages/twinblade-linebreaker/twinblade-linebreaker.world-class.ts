import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const twinbladeLinebreaker = {
  id: "01a06586-0a6d-7a8c-8694-2c4ecba950ee",
  type: "world-class",
  slug: "twinblade-linebreaker",
  title: "Twinblade Linebreaker",
  world: "the-wandering-inn",
  evolvesToSlugs: ["maimed-twinblade"],
  references: "jsonl",
} as const satisfies WorldClass
