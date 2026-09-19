import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const improvedWorkoutGains = {
  id: "01a06575-981e-749f-89da-eb8a593dd695",
  type: "page-type/world-skill",
  slug: "improved-workout-gains",
  title: "Improved Workout Gains",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
