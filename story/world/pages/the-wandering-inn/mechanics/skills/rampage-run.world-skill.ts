import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rampageRun = {
  id: "01a0657d-029c-746d-a81c-baee20d5daa1",
  type: "page-type/world-skill",
  slug: "rampage-run",
  title: "Rampage Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
