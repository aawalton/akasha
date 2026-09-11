import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hearWhispers = {
  id: "01a06575-9819-7bf4-9750-623ff97a5b05",
  type: "world-skill",
  slug: "hear-whispers",
  title: "Hear Whispers",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
