import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const recordSpell = {
  id: "01a0657d-02a6-738a-9848-71e90c80c469",
  type: "page-type/world-skill",
  slug: "record-spell",
  title: "Record Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
