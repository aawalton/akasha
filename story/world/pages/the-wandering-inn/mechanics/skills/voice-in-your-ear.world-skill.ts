import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const voiceInYourEar = {
  id: "01a0657d-0320-705c-9f5f-2e2983b6ad0e",
  type: "page-type/world-skill",
  slug: "voice-in-your-ear",
  title: "Voice in Your Ear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
