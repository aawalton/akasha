import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vanguardOfTerror = {
  id: "01a0657d-0320-7fe0-90e8-5abf1dc9abbf",
  type: "page-type/world-skill",
  slug: "vanguard-of-terror",
  title: "Vanguard of Terror",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
