import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const waterfoot = {
  id: "01a0657d-032c-7ade-8b76-7b5e5209070d",
  type: "page-type/world-skill",
  slug: "waterfoot",
  title: "Waterfoot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
