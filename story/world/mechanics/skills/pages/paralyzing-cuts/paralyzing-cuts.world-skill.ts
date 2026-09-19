import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const paralyzingCuts = {
  id: "01a0657d-0286-7911-8229-c11b4bc16920",
  type: "page-type/world-skill",
  slug: "paralyzing-cuts",
  title: "Paralyzing Cuts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
