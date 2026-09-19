import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sympatheticEar = {
  id: "01a0657d-0307-73f5-a7d4-0027afcfd950",
  type: "page-type/world-skill",
  slug: "sympathetic-ear",
  title: "Sympathetic Ear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
