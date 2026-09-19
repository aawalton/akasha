import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rebukeTheIgnorant = {
  id: "01a0657d-02a5-7585-b8f9-1bd1c3c3ee9f",
  type: "page-type/world-skill",
  slug: "rebuke-the-ignorant",
  title: "Rebuke the Ignorant",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
