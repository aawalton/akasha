import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const trustedVoice = {
  id: "01a0657d-0317-7fd4-9f09-0709ce71225e",
  type: "world-skill",
  slug: "trusted-voice",
  title: "Trusted Voice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
