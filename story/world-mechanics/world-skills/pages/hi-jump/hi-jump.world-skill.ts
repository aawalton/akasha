import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hiJump = {
  id: "01a06575-981a-7daa-82be-6be9d3f5ab27",
  type: "world-skill",
  slug: "hi-jump",
  title: "Hi-Jump",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
