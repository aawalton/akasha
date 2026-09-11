import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const survivalVeteran = {
  id: "01a0657d-0303-7703-b365-9af281d25beb",
  type: "world-skill",
  slug: "survival-veteran",
  title: "Survival Veteran",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
