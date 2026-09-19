import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const powerThrow = {
  id: "01a0657d-0296-7750-bbc1-73c9c09e5dbe",
  type: "page-type/world-skill",
  slug: "power-throw",
  title: "Power Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
