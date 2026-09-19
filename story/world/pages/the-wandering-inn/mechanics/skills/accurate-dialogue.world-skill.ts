import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const accurateDialogue = {
  id: "01a06575-97e8-7c65-ae0b-fc61e0ffb63c",
  type: "page-type/world-skill",
  slug: "accurate-dialogue",
  title: "Accurate Dialogue",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
