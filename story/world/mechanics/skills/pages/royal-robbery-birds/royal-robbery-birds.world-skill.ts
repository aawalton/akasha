import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalRobberyBirds = {
  id: "01a0657d-02b7-7c10-8203-e62f5998c824",
  type: "page-type/world-skill",
  slug: "royal-robbery-birds",
  title: "Royal Robbery: Birds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
