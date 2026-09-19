import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shadowFamiliar = {
  id: "01a0657d-02bf-7d6d-84fd-32365ef58a50",
  type: "page-type/world-skill",
  slug: "shadow-familiar",
  title: "Shadow Familiar",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
