import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingThrust = {
  id: "01a0657d-0294-765d-832e-9a67f0cda77b",
  type: "page-type/world-skill",
  slug: "piercing-thrust",
  title: "Piercing Thrust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
