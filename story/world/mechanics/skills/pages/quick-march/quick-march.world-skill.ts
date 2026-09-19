import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickMarch = {
  id: "01a0657d-029b-70fc-a10a-1dc1573864bb",
  type: "page-type/world-skill",
  slug: "quick-march",
  title: "Quick March",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
