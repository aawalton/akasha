import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const memorizeSpeech = {
  id: "01a0657d-024c-7f09-8afe-4a8b1b9faded",
  type: "world-skill",
  slug: "memorize-speech",
  title: "Memorize Speech",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
