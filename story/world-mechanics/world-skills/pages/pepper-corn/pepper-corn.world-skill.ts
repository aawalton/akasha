import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const pepperCorn = {
  id: "01a0657d-028e-74ec-b5b1-eb8033c77c5b",
  type: "world-skill",
  slug: "pepper-corn",
  title: "Pepper Corn",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
