import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const shieldWall = {
  id: "01a0657d-02c0-7092-8cf7-a03589727800",
  type: "world-skill",
  slug: "shield-wall",
  title: "Shield Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
