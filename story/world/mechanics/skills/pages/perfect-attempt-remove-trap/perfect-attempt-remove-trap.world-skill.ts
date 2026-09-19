import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectAttemptRemoveTrap = {
  id: "01a0657d-028e-7855-b693-30358cc7a008",
  type: "page-type/world-skill",
  slug: "perfect-attempt-remove-trap",
  title: "Perfect Attempt: Remove Trap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
