import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const voiceOfPersuasion = {
  id: "01a0657d-0320-7bad-947d-94d8fe72e993",
  type: "page-type/world-skill",
  slug: "voice-of-persuasion",
  title: "Voice of Persuasion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
