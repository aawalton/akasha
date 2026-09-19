import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stateOfNations = {
  id: "01a0657d-02ee-72e1-8542-f45feb3fac95",
  type: "page-type/world-skill",
  slug: "state-of-nations",
  title: "State of Nations",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
