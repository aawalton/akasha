import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pierceThrust = {
  id: "01a0657d-0290-71dd-b7e7-a117c0041376",
  type: "page-type/world-skill",
  slug: "pierce-thrust",
  title: "Pierce Thrust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
