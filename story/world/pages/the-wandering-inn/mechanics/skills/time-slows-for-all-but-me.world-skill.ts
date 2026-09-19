import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const timeSlowsForAllButMe = {
  id: "01a0657d-0315-7c05-b6d1-cc1e675fa6b4",
  type: "page-type/world-skill",
  slug: "time-slows-for-all-but-me",
  title: "Time Slows For All But Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
