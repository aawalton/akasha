import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const readBetweenTheLines = {
  id: "01a0657d-02a5-7c87-91c2-89a0027dddf3",
  type: "page-type/world-skill",
  slug: "read-between-the-lines",
  title: "Read Between the Lines",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
