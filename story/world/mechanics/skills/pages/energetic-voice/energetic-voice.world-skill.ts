import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const energeticVoice = {
  id: "01a06575-9808-7903-a6b1-369dd65edced",
  type: "page-type/world-skill",
  slug: "energetic-voice",
  title: "Energetic Voice",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
