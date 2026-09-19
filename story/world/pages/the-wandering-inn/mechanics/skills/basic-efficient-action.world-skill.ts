import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicEfficientAction = {
  id: "01a06575-97f3-7fca-9807-11ab3a006956",
  type: "page-type/world-skill",
  slug: "basic-efficient-action",
  title: "Basic Efficient Action",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
