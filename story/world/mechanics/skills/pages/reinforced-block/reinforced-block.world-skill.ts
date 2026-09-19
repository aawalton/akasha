import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reinforcedBlock = {
  id: "01a0657d-02a6-7863-841f-ecd6c4949bfd",
  type: "page-type/world-skill",
  slug: "reinforced-block",
  title: "Reinforced Block",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
