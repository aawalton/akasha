import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicThought = {
  id: "01a0657d-0242-70f0-bcbd-0f094362caa4",
  type: "page-type/world-skill",
  slug: "magic-thought",
  title: "Magic Thought",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
