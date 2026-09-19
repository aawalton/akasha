import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reputationWorkoutStory = {
  id: "01a0657d-02b1-7870-bec5-b8e20e16b34a",
  type: "page-type/world-skill",
  slug: "reputation-workout-story",
  title: "Reputation: Workout Story",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
