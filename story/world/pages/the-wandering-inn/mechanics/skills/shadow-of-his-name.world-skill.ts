import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shadowOfHisName = {
  id: "01a0657d-02bf-736e-adc8-0120244ae65f",
  type: "page-type/world-skill",
  slug: "shadow-of-his-name",
  title: "Shadow of His Name",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
