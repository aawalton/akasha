import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sobering = {
  id: "01a0657d-02c7-7fdf-bf05-22eea27008a0",
  type: "page-type/world-skill",
  slug: "sobering",
  title: "Sobering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
