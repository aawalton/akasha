import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const contestOfChampionsVigor = {
  id: "01a06575-97fd-7b73-8c1c-f3a71eda43c5",
  type: "page-type/world-skill",
  slug: "contest-of-champions-vigor",
  title: "Contest of Champions (Vigor)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
