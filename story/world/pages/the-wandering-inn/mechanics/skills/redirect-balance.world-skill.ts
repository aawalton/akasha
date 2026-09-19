import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const redirectBalance = {
  id: "01a0657d-02a6-7b2c-a010-658b33d5ce2f",
  type: "page-type/world-skill",
  slug: "redirect-balance",
  title: "Redirect Balance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
