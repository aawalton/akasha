import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tirelessHandWriting = {
  id: "01a0657d-0315-7de7-a7a0-38e3da0c42f3",
  type: "page-type/world-skill",
  slug: "tireless-hand-writing",
  title: "Tireless Hand: Writing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
