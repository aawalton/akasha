import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const prayer = {
  id: "01a0657d-0296-7e29-a359-1e8d414cbb7d",
  type: "page-type/world-skill",
  slug: "prayer",
  title: "Prayer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
