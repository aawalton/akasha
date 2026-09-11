import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const voiceOfCommand = {
  id: "01a0657d-0320-7b1f-804e-340442c33844",
  type: "world-skill",
  slug: "voice-of-command",
  title: "Voice of Command",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
