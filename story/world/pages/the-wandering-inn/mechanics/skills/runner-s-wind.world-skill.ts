import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const runnerSWind = {
  id: "01a0657d-02b7-7bc1-816e-953fb97a26ae",
  type: "page-type/world-skill",
  slug: "runner-s-wind",
  title: "Runner’s Wind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
