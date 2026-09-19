import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const noFalseThreats = {
  id: "01a0657d-027b-7b9d-80d6-de143dea2acd",
  type: "page-type/world-skill",
  slug: "no-false-threats",
  title: "No False Threats",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
