import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teamAttack = {
  id: "01a0657d-0310-7c3e-b46a-292a59518ecb",
  type: "page-type/world-skill",
  slug: "team-attack",
  title: "Team Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
