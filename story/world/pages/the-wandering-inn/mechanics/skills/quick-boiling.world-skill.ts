import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickBoiling = {
  id: "01a0657d-029b-7e2f-9cee-ad239099f3fe",
  type: "page-type/world-skill",
  slug: "quick-boiling",
  title: "Quick Boiling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
