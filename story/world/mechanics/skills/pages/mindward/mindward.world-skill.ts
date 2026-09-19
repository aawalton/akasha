import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mindward = {
  id: "01a0657d-024d-71cd-ac68-19104c8d85c6",
  type: "page-type/world-skill",
  slug: "mindward",
  title: "Mindward",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
