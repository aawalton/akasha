import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const threadOfFate = {
  id: "01a0657d-0315-7628-8d30-247194be1c8c",
  type: "page-type/world-skill",
  slug: "thread-of-fate",
  title: "Thread of Fate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
