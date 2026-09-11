import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const taunt = {
  id: "01a0657d-0310-77b1-942d-de32d8213efd",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "taunt",
  title: "Taunt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
