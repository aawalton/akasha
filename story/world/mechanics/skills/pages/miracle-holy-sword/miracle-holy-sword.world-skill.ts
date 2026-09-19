import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const miracleHolySword = {
  id: "01a0657d-026d-783c-946f-189f62e03f45",
  type: "page-type/world-skill",
  slug: "miracle-holy-sword",
  title: "Miracle: Holy Sword",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
