import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const retryMistake = {
  id: "01a0657d-02b1-764f-a34c-088933e3801c",
  type: "page-type/world-skill",
  slug: "retry-mistake",
  title: "Retry Mistake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
