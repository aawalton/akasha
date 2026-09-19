import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseIntention = {
  id: "01a0657d-02be-700f-88f6-7786a0c14085",
  type: "page-type/world-skill",
  slug: "sense-intention",
  title: "Sense Intention",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
