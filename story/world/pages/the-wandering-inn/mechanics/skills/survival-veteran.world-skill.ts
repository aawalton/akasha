import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const survivalVeteran = {
  id: "01a0657d-0303-7703-b365-9af281d25beb",
  type: "page-type/world-skill",
  slug: "survival-veteran",
  title: "Survival Veteran",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
