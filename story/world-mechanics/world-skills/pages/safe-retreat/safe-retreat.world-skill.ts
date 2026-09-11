import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const safeRetreat = {
  id: "01a0657d-02b7-7bcd-bd6b-b815028df7e9",
  type: "world-skill",
  slug: "safe-retreat",
  title: "Safe Retreat",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
