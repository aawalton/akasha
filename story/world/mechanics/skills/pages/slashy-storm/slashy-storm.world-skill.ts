import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slashyStorm = {
  id: "01a0657d-02c6-77e9-973c-b46425fa104e",
  type: "page-type/world-skill",
  slug: "slashy-storm",
  title: "Slashy Storm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
