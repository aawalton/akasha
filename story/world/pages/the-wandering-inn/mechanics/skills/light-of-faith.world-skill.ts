import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightOfFaith = {
  id: "01a0657d-023f-7c0a-8e5a-f65bd1ee2130",
  type: "page-type/world-skill",
  slug: "light-of-faith",
  title: "Light of Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
