import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const monumentalAnimation = {
  id: "01a0657d-026f-79d1-be78-260f7be84731",
  type: "page-type/world-skill",
  slug: "monumental-animation",
  title: "Monumental Animation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
