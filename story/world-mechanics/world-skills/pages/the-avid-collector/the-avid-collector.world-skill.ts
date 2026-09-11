import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const theAvidCollector = {
  id: "01a0657d-0311-7d72-aa0f-ad9ed97535ee",
  type: "world-skill",
  slug: "the-avid-collector",
  title: "The Avid Collector",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
