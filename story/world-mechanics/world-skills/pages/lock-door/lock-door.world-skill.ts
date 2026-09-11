import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lockDoor = {
  id: "01a0657d-0240-78f9-9fd4-6bb3a96d78d7",
  type: "world-skill",
  slug: "lock-door",
  title: "Lock Door",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
