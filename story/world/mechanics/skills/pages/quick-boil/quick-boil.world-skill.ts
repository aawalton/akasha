import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickBoil = {
  id: "01a0657d-029b-7bf1-a605-7b7ae9a07639",
  type: "page-type/world-skill",
  slug: "quick-boil",
  title: "Quick Boil",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
