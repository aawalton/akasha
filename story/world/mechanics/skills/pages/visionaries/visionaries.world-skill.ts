import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const visionaries = {
  id: "01a0657d-0320-7075-ad63-aba3c7245e9f",
  type: "page-type/world-skill",
  slug: "visionaries",
  title: "Visionaries",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
