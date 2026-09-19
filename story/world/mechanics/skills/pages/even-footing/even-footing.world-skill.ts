import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evenFooting = {
  id: "01a06575-9809-71e6-8bda-b39f77353aef",
  type: "page-type/world-skill",
  slug: "even-footing",
  title: "Even Footing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
