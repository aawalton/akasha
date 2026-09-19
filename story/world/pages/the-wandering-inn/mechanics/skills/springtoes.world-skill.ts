import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const springtoes = {
  id: "01a0657d-02ee-71ce-9239-94dfbefcc72a",
  type: "page-type/world-skill",
  slug: "springtoes",
  title: "Springtoes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
