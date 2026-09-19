import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const retractLine = {
  id: "01a0657d-02b1-72c7-805e-edc14b68450e",
  type: "page-type/world-skill",
  slug: "retract-line",
  title: "Retract Line",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
