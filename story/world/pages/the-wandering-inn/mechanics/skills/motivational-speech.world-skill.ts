import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const motivationalSpeech = {
  id: "01a0657d-026f-7d5a-bb42-95bb061003cc",
  type: "page-type/world-skill",
  slug: "motivational-speech",
  title: "Motivational Speech",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
