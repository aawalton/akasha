import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectSlash = {
  id: "01a0657d-028f-7983-b82c-bcb68cea80e2",
  type: "page-type/world-skill",
  slug: "perfect-slash",
  title: "Perfect Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
