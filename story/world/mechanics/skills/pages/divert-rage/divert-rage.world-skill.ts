import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const divertRage = {
  id: "01a06575-9804-7b7b-9863-eb6eb8409d12",
  type: "page-type/world-skill",
  slug: "divert-rage",
  title: "Divert Rage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
