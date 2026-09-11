import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const universalFaith = {
  id: "01a0657d-031f-734c-ae9e-3360b94e2e0b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "universal-faith",
  title: "Universal Faith",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
