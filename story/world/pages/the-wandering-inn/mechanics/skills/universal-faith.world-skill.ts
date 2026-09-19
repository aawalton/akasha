import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const universalFaith = {
  id: "01a0657d-031f-734c-ae9e-3360b94e2e0b",
  type: "page-type/world-skill",
  slug: "universal-faith",
  title: "Universal Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
