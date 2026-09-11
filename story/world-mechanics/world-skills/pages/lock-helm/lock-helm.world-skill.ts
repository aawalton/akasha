import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lockHelm = {
  id: "01a0657d-0240-7d7c-ba57-c78c5586f4f8",
  type: "world-skill",
  slug: "lock-helm",
  title: "Lock Helm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
