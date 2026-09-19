import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const markTarget = {
  id: "01a0657d-024b-71aa-aa1a-d954489e39a8",
  type: "page-type/world-skill",
  slug: "mark-target",
  title: "Mark Target",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
