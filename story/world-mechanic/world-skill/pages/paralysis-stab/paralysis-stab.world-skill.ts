import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const paralysisStab = {
  id: "01a0657d-0286-79de-b597-ba151cc48fe5",
  type: "world-skill",
  slug: "paralysis-stab",
  title: "Paralysis Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
