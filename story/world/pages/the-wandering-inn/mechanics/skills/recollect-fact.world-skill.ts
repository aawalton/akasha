import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recollectFact = {
  id: "01a0657d-02a6-7a1b-8d1a-85b17423c28d",
  type: "page-type/world-skill",
  slug: "recollect-fact",
  title: "Recollect Fact",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
