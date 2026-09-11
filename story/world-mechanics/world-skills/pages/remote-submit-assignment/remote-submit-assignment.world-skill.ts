import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const remoteSubmitAssignment = {
  id: "01a0657d-02b0-7d63-9600-0705b82087d0",
  type: "world-skill",
  slug: "remote-submit-assignment",
  title: "Remote Submit Assignment",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
