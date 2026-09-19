import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const primalFear = {
  id: "01a0657d-0297-7cac-944a-574748017210",
  type: "page-type/world-skill",
  slug: "primal-fear",
  title: "Primal Fear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
