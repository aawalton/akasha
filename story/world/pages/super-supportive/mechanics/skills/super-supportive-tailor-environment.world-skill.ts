import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveTailorEnvironment = {
  id: "01a0e9f1-d242-7a7e-9a8a-eba508acbbff",
  type: "page-type/world-skill",
  slug: "super-supportive-tailor-environment",
  title: "Tailor Environment",
  world: "world/super-supportive",
  description:
    "A C-rank Rabbit skill: a knack for arranging possessions so that they suit their owner.",
} as const satisfies WorldSkill
